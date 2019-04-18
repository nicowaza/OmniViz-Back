import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { userRouter } from './api/users';
import connection from './api/helpers/db.connexion';
import passport from 'passport'
const LdapStrategy = require('passport-ldapauth');

const app = express();

const port = process.env.PORT || 5000;

app.use(morgan('combined'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

let getLDAPConfiguration = function (req, callback) {
  process.nextTick(function () {
    var opts = {
      server: {
        url: "ldap://127.0.0.1:4000",
        bindDn: `uid=${req.body.username}`,
        bindCredentials: `${req.body.password}`,
        searchBase: 'test',
        searchFilter: `uid=${req.body.username}`,
        reconnect: true
      }
    };
    callback(null, opts);
  });
};

passport.use(new LdapStrategy(getLDAPConfiguration,
  function (user, done) {
    morgan.info("LDAP user ", user.username, "is logged in.")
    return done(null, user);
  }))

  passport.serializeUser(function (user, done) {
    done(null, user.uid)
  })
  passport.deserializeUser(function (id, done) {
    User.findOne({ uid: id }).exec()
      .then(user => {
        if (!user) {
          done(new Error(`Cannot find user with uid=${id}`))
        } else {
          done(null, user)
        }
      })
  })


  app.post('/login', passport.authenticate('ldapauth', {session: false}), function(req, res) {
    res.send({
      error: err,
      status: 'ok',
      content: data
    });
  });

app.listen(port, () => console.log(`server is running on port ${port}`))