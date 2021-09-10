require('dotenv').config();

const config = {
  PORT: process.env.PORT || 4001,
  DB: {
    CONNECTION_STRING: process.env.PG_CONNECTION_STRING,
    DEFAULT_LIMIT_SIZE: process.env.DEFAULT_LIMIT_SIZE,
    FILTER_COLUMN_LIST: process.env.FILTER_COLUMN_LIST && process.env.FILTER_COLUMN_LIST.split(',')
  }
}

module.exports = config;