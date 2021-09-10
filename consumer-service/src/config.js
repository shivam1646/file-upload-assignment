require('dotenv').config();

const config = {
  PORT: process.env.PORT || 4002,
  DB: {
    CONNECTION_STRING: process.env.PG_CONNECTION_STRING
  },
  KAFKA: {
    CLIENT_ID: process.env.CLIENT_ID || 'genea',
    BROKERS: process.env.KAFKA_BROKERS && process.env.KAFKA_BROKERS.split(','),
    TOPIC: process.env.KAFKA_TOPIC,
    CONSUMER: {
      GROUP_ID: process.env.KAFKA_CONSUMER_GROUP_ID,
      MAX_BYTES_PER_PARTITION: process.env.KAFKA_CONSUMER_MAX_BYTES_PER_PARTITION,
      MAX_BYTES: process.env.MAX_BYTES
    }
  }
}

module.exports = config;