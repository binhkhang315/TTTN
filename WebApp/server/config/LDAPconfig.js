  var LDAP_PORT = 389;
module.exports = {
    server: {
        url: 'ldap://192.168.122.20:' + LDAP_PORT.toString(),
        bindDn: 'cn=admin,dc=example,dc=com',
        bindCredentials: '123456',
        searchBase: 'dc=example,dc=com',
        searchFilter: '(mail={{username}})'
    }
};
