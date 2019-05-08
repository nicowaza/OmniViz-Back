import express from 'express'
import jwt from '../helpers/jwt';

import 'dotenv/config';
import connection from '../helpers/db.connexion';

const secret = process.env.key;

export const loginRouter = express.Router();


loginRouter.post('/', (req, res) => {

  const { password, username } = req.body

  // const user = _users.find((user) => user.username === req.body.username);
  let query = `SELECT * FROM users WHERE username = '${username}'`;

  connection.query(query, (err, results) => {

    if(!results) res.status(404).send('User not found')
      if(results[0].password !== password) return res.status(404).send('Password incorrect')

      const token = jwt.issue({
        username
      }, secret, {expiresIn: 18000})
      console.log(token)
      res.json({'token': token})
    })
})