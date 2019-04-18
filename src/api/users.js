import express from 'express';
import passport from 'passport';
import connection from './helpers/db.connexion';
const mysql = require('mysql')

export const userRouter = express.Router();


userRouter.get('/', (req, res) => {
  connection.query('SELECT * FROM users ', (err, results, fields) => {
    if (err) {
      console.log(err);
      res.status(400).send({ status: false, message: 'User not created'})
      // res.send({
      //   err
      // })
    }else {
      console.log(results)
      res.status(200).send({status: true, content: results});
    }
  });
});

userRouter.post('/', (req, res) => {
  const body = req.body;
  let username = body.username;
  let password = body.password;
  let firstname = body.firstname;
  let lastname = body.lastname;
  let avatarUrl = body.avatarUrl;
  let university = body.university;
  let role = body.role;

  if (!username || !password) {
    res.status(412).send('Username and password are missing')
  }else{

    let query = `INSERT INTO users (username, password, firstname, lastname, avatarUrl, university, role) VALUES ('${username}', '${password}', '${firstname}', '${lastname}', '${avatarUrl}', '${university}', '${role}')`;

    connection.query(query, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(400).send({ status: false, message: 'User not created'})
        // res.send({
        //   err
        // })
      }else{
        console.log(results);
        res.send({
          status:200,
          "success":"new user registered sucessfully",
          content: results
        });
      }
    })
  }
})