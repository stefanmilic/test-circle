const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');

const server = express();
require('dotenv').config();
const registerRoutes = require('./routes');

server.use(bodyParser.json());

const port = 3000;

registerRoutes(server);

server.listen(port, (err) => {
  if (err) {
    console.error('something bad happened', err);
  } else {
    console.info(`> Ready on ${process.env.HOST}`);
  }
});

// export the wrapped handler for the Lambda runtime
module.exports.handler = serverless(server);
