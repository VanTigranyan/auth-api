const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

module.exports = {
  authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
  const user = await User.findOne({username: username});

  if (user && bcrypt.compareSync(password,user.hash)) {

    const token = jwt.sign({ sub: user.id }, config.secret);

    const { hash, ...userWithoutHash } = user.toObject();
    
    return {
      ...userWithoutHash,
      token
    };
  }
}

// Get all users
async function getAll() {
  return await User.find({}).select('-hash');
}

// Get user by id
async function getById(id) {
  return await User.findById(id).select('-hash');
}

// Create new user
async function create(userParam) {
  if (await User.findOne({username: userParam.username})) {
    throw "Username \'" + userParam.username + "\' is already taken!"
  }

  const user = new User(userParam);

   if(userParam.password) {
     user.hash = bcrypt.hashSync(userParam.password, 10);
   }
   user.save();
}

 // Update user params
 async function update(id, userParams) {
   const user = User.findById(id);
   // if there is no such a user
   if(!user)  throw "User not found";

   // if username is taken already
   if(user.username !== userParam.username && await User.findOne({username:userParam.username})) {
     throw "Username \'"+ userParam.username +"\' is already taken!"
   }

   // if user wants to change password
   if(userParam.password) {
     userParam.hash = bcrypt.hashSync(userParam.password, 10);
   }

   // copy and rewrite userParam props to user
   Object.assign(user, userParam);

   await user.save();
 }

//delete user
async function _delete(id) {
  User.findByIdAndRemove(id);
}
