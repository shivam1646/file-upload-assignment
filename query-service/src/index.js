const express = require('express');
const log = require('loglevel');

const config = require('./config');

log.setLevel('INFO');

const app = express();

app.get('/', function(req, res){
  res.json({message: "Data query microservice"});
});

const routes = require('./routes');
app.use(routes);
  
app.get('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found' });
});

app.listen(config.PORT, () => {
  log.info('Query server started');
});