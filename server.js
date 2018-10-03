require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(jwt());

app.use('/users', require('./users/user.controller'));

app.use(errorHandler);
app.use(morgan('combined'));

const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function() {
  console.log('Server is listening on port ' + port)
})