const User = require('../models/User');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

module.exports = class UserService {
  static async create({ email, password, profilePhotoURL }) {
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const user = await User.insert({ email, passwordHash, profilePhotoURL });
    return user;
  }
  

};
