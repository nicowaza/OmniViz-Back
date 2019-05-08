import jwt from 'jsonwebtoken';
import "dotenv/config";

const secretKey = process.env.key

export default {

    //Sign Token
    issue(payload, expiresIn){
      return jwt.sign(payload, secretKey, {expiresIn: 10800})
  }
}