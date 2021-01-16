const User = require('../models/User');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

module.exports = class UserService {
  static async create({ email, password, profilePhotoURL }) {
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const user = await User.insert({ email, passwordHash, profilePhotoURL });
    return user;
  }
  
  static async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email=$1',
      [email]
    );
    if(!rows[0]) throw new Error(`No user with email ${email} found.`);
    return new User(rows[0]);
  }

};
