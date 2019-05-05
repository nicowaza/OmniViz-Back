import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { userRouter } from './api/users';
import { loginRouter } from './api/login';
import connection from './api/helpers/db.connexion';
import passport from 'passport'
import { getLDAPConfiguration } from './api/helpers/passport/ldapConfig'
const LdapStrategy = require('passport-ldapauth');

const app = express();

const port = process.env.PORT || 5000;

app.use(morgan('combined'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/login', loginRouter);

// let getLDAPConfiguration = function (req, callback) {
//   process.nextTick(function () {
//     var opts = {
//       server: {
//         // url: "ldap://127.0.0.1:4000",
//         // bindDn: `cn=${req.body.username},dc=test`,
//         // bindCredentials: `${req.body.password}`,
//         // searchBase: 'dc=test',
//         // searchFilter: `uid=${req.body.username}`,
//         // reconnect: true
//         // bindDN: 'cn=root',
//         // bindCredentials: 'secret',
//         // searchBase: 'ou=passport-ldapauth',
//         // searchFilter: '(uid={{username}})'
//         url: 'ldap://ldap.forumsys.com:389',
//         bindDn: "cn=read-only-admin,dc=example,dc=com",
//         bindCredentials: "password",
//         searchBase: 'dc=example,dc=com',
//         searchFilter: 'uid={{username}}'
//       }
//     };
//     callback(null, opts);
//     console.log('hello')
//   });
// };

// passport.use(new LdapStrategy(getLDAPConfiguration,
//   function (user, done) {
//     // morgan.info("LDAP user ", user.username, "is logged in.")
//     console.log('user', user)
//     return done(null, user);
    
//   }))

  // passport.serializeUser(function (user, done) {
  //   done(null, user.uid)
  //   console.log('hihi')
  // })
  // passport.deserializeUser(function (id, done) {
  //   User.findOne({ uid: id }).exec()
  //     .then(user => {
  //       if (!user) {
  //         done(new Error(`Cannot find user with uid=${id}`))
  //       } else {
  //         done(null, user)
  //         res.send(user)
  //         console.log('user data', user)
  //       }
  //     })
  // })


  // app.post('/login', passport.authenticate('ldapauth', {session: false}), function(req, res) {
    
  //   res.send({
  //     status: 'ok',
  //   });
  // });

app.listen(port, () => console.log(`server is running on port ${port}`))