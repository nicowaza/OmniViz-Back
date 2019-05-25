import express from 'express'
import jwt from '../helpers/jwt';

import 'dotenv/config';
import connection from '../helpers/db.connexion';

const secret = process.env.key;

export const loginRouter = express.Router();


loginRouter.post('/', (req, res) => {

  const { password, email } = req.body

  // const user = _users.find((user) => user.username === req.body.username);
  let query = `SELECT * FROM users WHERE email = '${email}'`;

  connection.query(query, (err, results) => {

    if(!results) return res.status(404).send('User not found')
      if(results[0].password !== password) return res.status(404).send('Password incorrect')

      const token = jwt.issue({
        email
      }, secret, {expiresIn: 18000})
      console.log(token)
      res.json({'token': token})
    })
})