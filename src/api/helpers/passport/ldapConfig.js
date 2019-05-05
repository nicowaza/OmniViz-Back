export const getLDAPConfiguration = function (req, callback) {
  process.nextTick(function () {
    var opts = {
      server: {
        // url: "ldap://127.0.0.1:4000",
        // bindDn: `cn=${req.body.username},dc=test`,
        // bindCredentials: `${req.body.password}`,
        // searchBase: 'dc=test',
        // searchFilter: `uid=${req.body.username}`,
        // reconnect: true
        // bindDN: 'cn=root',
        // bindCredentials: 'secret',
        // searchBase: 'ou=passport-ldapauth',
        // searchFilter: '(uid={{username}})'
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