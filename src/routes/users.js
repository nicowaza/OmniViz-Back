const express = require('express')
const pool = require ('../helpers/db.connexion');
// import { verifiedAuth } from '../helpers/verifyAuth';
const verifiedAuth = require('../helpers/verifyAuth');
const mysql = require('mysql');
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
const socket = require ('socket.io');
const passport = require('passport');
require('../helpers/passport').default(passport);
// import { io } from '../index';

const userRouter = express.Router();

export default function(app, passport, io) {
  // userRouter.get('/', verifiedAuth, (req, res, next) => {
  //   //les data du user authentifié peuvent être retrouvées dans l'objet req.user
  //   const user = req.user[0];
  //   const userdata = {
  //     username: user.username,
  //     email: user.email,
  //     role: user.role
  //   };

  //   //renvoie le user + isAuthenticated à true dans le front
  //   res.send({status: 200, userdata: userdata, isAuthenticated: req.isAuthenticated()})
  // });

  userRouter.post('/register', (req, res) => {

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
        status:400,
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
      let avatar = body.avatar;
      let university = body.university;
      let role = body.role;

      const saltRounds = 10;

      bcrypt.hash(password, saltRounds, function(err, hash) {
        let query = `INSERT INTO users (email, username, password, firstname, lastname, avatar, university, role) VALUES ('${email}', '${username}', '${hash}', '${firstname}', '${lastname}', '${avatar}', '${university}', '${role}')`;

        pool.query(query, (err, results, fields) => {
          if (errors) {
            console.log(errors);
            res.send({
              status:400,
              errors:errors
            });
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
    passport.authenticate('local',  (err, user, message) => {
      if(err){
        res.send({status: 403, errors: message})
      }
      else {
        req.login(user, (err) => {
          if(err) {
            console.log(err)
          }
          console.log('authentifié', req.isAuthenticated())
          res.send({user: user, isAuthenticated: req.isAuthenticated(), message: message.message})
        })
      }
    })(req,res,next);
  });

  userRouter.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.clearCookie('sid')

    //envoie isAuthenticated à false dans le front
    res.send(({status: 200, isAuthenticated: req.isAuthenticated()}))
  });
  return userRouter;
}