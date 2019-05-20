import axios from 'axios';
import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import qs from 'querystring';
import config from '../../util/config';
import User from '../../models/User';
import * as types from '../../@types/auth.ctrl';

const getJWT = (id: string) => new Promise((resolve, reject) => {
  jwt.sign({ id }, config.JWT_SALT, {
    expiresIn: '30d',
    issuer: 'todolist-example',
  }, (err, token) => {
    if (err) reject(err);
    resolve(token);
  });
});

export const login = (req: Request, res: Response) => {
  res.redirect('https://www.facebook.com/v3.3/dialog/oauth' +
    `?client_id=${config.CLIENT_ID}` +
    `&redirect_uri=https://${req.hostname}/api/auth/oauth` +
    `&state=${config.CSRF_TOKEN}`);
};

export const oauth = async (req: Request, res: Response) => {
// tslint:disable-next-line: ter-indent
try {
  const body: types.IOAuthRequest = req.query;
  const { code } = body;

  const { data: tokenRes } = await axios
    .get<types.IFacebookTokenResponse>('https://graph.facebook.com/v3.3/oauth/access_token', {
      params: {
        code,
        client_id: config.CLIENT_ID,
        redirect_uri: `https://${req.hostname}/api/auth/oauth`,
        client_secret: config.CLIENT_SECRET,
      },
    });

  const { data: infoRes } = await axios
    .get<types.IFacebookInfoResponse>('https://graph.facebook.com/me', {
      params: {
        fields: 'id,name',
        access_token: tokenRes.access_token,
      },
    });

  if (!await User.isExist(infoRes.id)) {
    await User.mCreate({
      accessToken: tokenRes.access_token,
      uniqueId: infoRes.id,
      name: infoRes.name,
    });
  }
  const result = qs.stringify({
    token: await getJWT(infoRes.id),
    userid: infoRes.id,
    name: infoRes.name,
  });
  res.redirect(`${config.SERVICE_URL}?${result}`);
} catch (e) {
  console.log(e);
  res.status(500).json({ result: 'ERROR' });
}
};
