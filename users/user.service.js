const config = require("config.json");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../db/models").User;

module.exports = {
  authenticate,
  getAll,
  register
};

async function authenticate({ username, password }) {
  const user = users.find(
    u => u.username === username && password === u.password
  );
  if (user) {
    console.log(user);
    const token = jwt.sign({ sub: user.userName }, config.secret);
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token
    };
  }
}

async function getAll() {
  return users.map(u => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
}

async function register({ username, password, firstName, lastName }) {
  let user = {
    username,
    password,
    firstName,
    lastName
  };
  let foundUser = undefined;
  User.find({ userName }, u => {
    foundUser = u;
  });
  let newUser = new User(user);
  if(!foundUser) {
    newUser.save((err,user) =>{
      if (err) return console.error(err);
      return user
    })
  }
}
