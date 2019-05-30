import express from 'express';
import connection from '../helpers/db.connexion';
import { verifiedAuth } from '../helpers/verifyAuth';
const mysql = require('mysql');
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
const passport = require('passport');
require('../helpers/passport').default(passport);

export const userRouter = express.Router();


userRouter.get('/', verifiedAuth, (req, res, next) => {
  //les data du user authentifié peuvent être retrouvées dans l'objet req.user
  const user = req.user[0];
  const userdata = {
    username: user.username,
    email: user.email
  };

  console.log('user data', userdata)
  console.log('the request session object', req.session);
  console.log('the serialized user from passport', req.user);

  res.send({status: 200, userdata: userdata})// passport.authenticate('local', (errors, user) =>{
  //   if(errors) {
  //     throw errors
  //   } else {
  //     // console.log('username', req.user.username)
  //     res.send(JSON.stringify(user.username))
  //   }

  // })(req,res,next);


  // connection.query('SELECT * FROM users ', (err, results, fields) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(400).send({ status: false, message: 'User not created'})
  //     // res.send({
  //     //   err
  //     // })
  //   }else {
  //     console.log(results)
  //     res.status(200).send({status: true, content: results});
  //   }
  // });
});

userRouter.post('/register', (req, res) => {

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

    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, function(err, hash) {
      let query = `INSERT INTO users (email, username, password, firstname, lastname, avatarUrl, university, role) VALUES ('${email}', '${username}', '${hash}', '${firstname}', '${lastname}', '${avatarUrl}', '${university}', '${role}')`;

      connection.query(query, (err, results, fields) => {
        if (errors) {
          console.log(errors);
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

userRouter.post('/login', (req, res, next) => {
  passport.authenticate('local',  (errors, user) => {
    if(errors){
      res.send({status: 500, message: 'something went wrong'})
    } else {
      req.login(user, (err) => {
        if(err) throw(err)
        console.log('req login :', user)
        console.log('login req.session', req.session)
        console.log('req.user :' ,req.user)
        res.send(JSON.stringify(user))
      })
    }
  })(req,res,next);
});

userRouter.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  console.log('authenticated :', req.isAuthenticated())
  res.send(({status: 200, message: 'user has logged out'}))
})