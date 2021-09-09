require('dotenv').config();

const config = {
  KAFKA: {
    CLIENT_ID: process.env.CLIENT_ID || 'genea',
    BROKERS: process.env.KAFKA_BROKERS && process.env.KAFKA_BROKERS.split(','),
    TOPIC: process.env.KAFKA_TOPIC
  }
}

module.exports = config;
