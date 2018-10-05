require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
const config = require('./config.json')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(jwt());

app.use('/users', require('./users/user.controller'));

app.use(errorHandler);
app.use(morgan('combined'));

//db
mongoose.connect('mongodb://VanTiger:vanblog21@ds123753.mlab.com:23753/users', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Mongo!')
});

const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function() {
  console.log('Server is listening on port ' + port)
})
// sudo lsof -t -i tcp:80 -s tcp:listen | sudo xargs kill
