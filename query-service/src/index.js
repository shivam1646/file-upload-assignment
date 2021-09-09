const express = require('express');
const log = require('loglevel');

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

app.listen(4001, () => {
  log.info('Query server started');
});