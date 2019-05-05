import passport from 'passport'
const LdapStrategy = require('passport-ldapauth');

let getLDAPConfiguration = function (req, callback) {
  process.nextTick(function () {
    var opts = {
      server: {
        url: 'ldap://ldap.forumsys.com:389',
        bindDn: "cn=read-only-admin,dc=example,dc=com",
        bindCredentials: "password",
        searchBase: 'dc=example,dc=com',
        searchFilter: 'uid={{username}}'
      }
    };
    callback(null, opts);
    console.log('hello')
  });
};

export const ldapAuth = passport.use(new LdapStrategy(getLDAPConfiguration,
    function (user, done) {
      // morgan.info("LDAP user ", user.username, "is logged in.")
      console.log('user', user)
      return done(null, user);

    }))

