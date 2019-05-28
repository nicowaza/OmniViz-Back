import express from 'express';
import connection from '../helpers/db.connexion';
const mysql = require('mysql');
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

  console.log('ça marche')
  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
  req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
  req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
  req.checkBody('email', 'Email field cannot be empty.').notEmpty();
  req.checkBody('password', 'Password field cannot be empty.').notEmpty();
  req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  req.checkBody('confirmedPassword', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody('confirmedPassword', 'Passwords do not match, please try again.').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    console.log(`errors: ${JSON.stringify(errors)}`);
    res.send({
      errors: errors
    });
  } else {
    let body = req.body;
    let email = body.email;
    let username = body.username;
    let password = body.password;
    let confirmedPassword = body.confirmedPassword;
    let firstname = body.firstname;
    let lastname = body.lastname;
    let avatarUrl = body.avatarUrl;
    let university = body.university;
    let role = body.role;



    bcrypt.hash(password, saltRounds, function(err, hash) {
      let query = `INSERT INTO users (email, username, password, firstname, lastname, avatarUrl, university, role) VALUES ('${email}', '${username}', '${hash}', '${firstname}', '${lastname}', '${avatarUrl}', '${university}', '${role}')`;

      connection.query(query, (err, results, fields) => {
        if (err) {
          console.log(err);
          res.status(400).send({ status: false, message: 'User not created'})
        }else{
          console.log(results);
          res.send({
            status:200,
            "success":"new user registered sucessfully",
            content: results
          });
        };
      });
    });
  };
});