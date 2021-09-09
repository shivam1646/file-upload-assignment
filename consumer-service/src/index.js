const express = require('express');
const log = require('loglevel');

const Consumer = require('./consumer');

log.setLevel('INFO');

const app = express();

app.get('/', function(req, res){
  res.json({ message: "Consumer microservice" });
});

app.get('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found' });
});

const consumer = new Consumer();
consumer.startConsumer.apply(consumer);

app.listen(4002, () => {
  log.info('Consumer service is running...');
});
