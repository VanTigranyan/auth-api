const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString, { useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Mongo!')
});

module.exports = {
    User: require('../users/user.model'),
    Post: require('../posts/post.model')
};
