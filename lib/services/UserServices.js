const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = class UserService {
  static async create({ email, password }) {
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const user = await User.insert({ email, passwordHash });
    return user;
  }
  
  static async authorize({ email, password }) {
    try {
      const user = await User.findByEmail(email);
      const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
      if(!passwordsMatch) throw new Error('Invalid Password');
      return user;
    } catch(err) {
      err.status = 401;
      throw err;
    }
  }

  // update admin password by email via put route
  static async changePassword(userId, password) {
    const newPasswordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const user = await User.findById(userId);
    return User.update({ ...user, password: newPasswordHash });
  }

  static authToken(user) {
    return jwt.sign({ user }, process.env.APP_SECRET, {
      expiresIn: '24h'
    });
  }

  static verifyAuthToken(token) {
    const { user } = jwt.verify(token, process.env.APP_SECRET);
    return user;
  }
};
