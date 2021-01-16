const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const UserService = require('../services/UserServices');

const attachCookie = (res, user) => {
  res.cookie('session', UserService.authToken(user), {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production'
  });
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    //this logs user in after signup - may not be needed once we seed the admin email
    UserService
      .create(req.body) 
      .then(user => {
        attachCookie(res, user);
        res.send(user);
      })
      .catch(next);
  })

  .post('/invite', ensureAuth, (req, res, next) => {
    UserService
      .create(req.body) 
      .then(user => {
        attachCookie(res, user);
        res.send(user);
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    UserService
      .authorize(req.body)
      .then(user => {
        attachCookie(res, user);
        res.send(user);
      })
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });
