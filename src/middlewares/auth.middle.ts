import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../util/config';

const verifyJWT = (token: string) => new Promise<ITokenPayload>((resolve, reject) => {
  jwt.verify(token, config.JWT_SALT, (err, decoded) => {
    if (err) reject(err);
    resolve(decoded as ITokenPayload);
  });
});

const auth = async (req: Request, res: Response, next: NextFunction) => {
// tslint:disable-next-line: ter-indent
try {
  const params: IReqPathParam = req.params;
  const headers = req.headers;
  const payload: ITokenPayload = await verifyJWT(headers.authorization as string);

  if (payload.id === params.id) next();
  else throw new Error('Invalid Access');
} catch (e) {
  if (e instanceof jwt.JsonWebTokenError || e instanceof jwt.TokenExpiredError) {
    res.status(401).json({ e, result: 'ERROR' });
  } else res.status(401).json({ message: 'Invalid Access', result: 'Error' });
}
};

export default auth;
