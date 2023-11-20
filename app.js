const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mailRoute = require('./routes/sendmail');

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use('/', mailRoute)

module.exports = app;
