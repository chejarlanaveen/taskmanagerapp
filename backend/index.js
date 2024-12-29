const express = require('express');
const serverless = require('serverless-http');
const path = require('path');

const app = express();

const server1 = require(path.resolve(__dirname,'server1'));
const server2 = require(path.resolve(__dirname,'server2'));

app.use('/server1',server1);
app.use('/server2',server2);

module.exports = serverless(app);
//module.exports = app2;