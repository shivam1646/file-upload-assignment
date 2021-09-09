const config = require('./src/config');

module.exports = {

  development: {
    client: 'pg',
    connection: config.DB.CONNECTION_STRING
  }
};
