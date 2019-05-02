import axios from 'axios';
import { Response, Request } from 'express';
import config from '../../util/config';
import User from '../../models/User';

interface IOAuthRequest {
  code: string;
}

interface ITokenResponse {
  access_token: string;
  token_token: string;
  expires_int: string;
}

interface IInfoResponse {
  id: string;
  name: string;
}

export const login = (req: Request, res: Response) => {
  res.redirect('https://www.facebook.com/v3.3/dialog/oauth' +
    `?client_id=${config.CLIENT_ID}` +
    `&redirect_uri=https://${req.hostname}/api/user/oauth` +
    `&state=${config.CSRF_TOKEN}`);
};

export const oauth = async (req: Request, res: Response) => {
// tslint:disable-next-line: ter-indent
try {
  const body: IOAuthRequest = req.query;
  const { code } = body;

  const { data: tokenRes } = await axios
    .get<ITokenResponse>('https://graph.facebook.com/v3.3/oauth/access_token', {
      params: {
        code,
        client_id: config.CLIENT_ID,
        redirect_uri: `https://${req.hostname}/api/user/oauth`,
        client_secret: config.CLIENT_SECRET,
      },
    });

  const { data: infoRes } = await axios
    .get<IInfoResponse>('https://graph.facebook.com/me', {
      params: {
        fields: 'id,name',
        access_token: tokenRes.access_token,
      },
    });

  const newUser = new User({
    accessToken: tokenRes.access_token,
    uniqueId: infoRes.id,
    name: infoRes.name,
  });

  await newUser.save();

  res.status(201).json({ result: 'OK' });
} catch (e) {
  console.log(e);
  res.status(500).json({ result: 'ERROR' });
}
};
