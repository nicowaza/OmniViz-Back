import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.key

export const verifyJwt = (req, res, next) => {
  const userToken = req.headers['token'];

  jwt.verify(userToken, secret, (error, decoded) => {
    if(error) res.status(403).send('Token is not valid')
    else {
      res.status(200)
      next()
    }
  })
}