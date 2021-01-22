const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const UserService = require('../services/UserServices');

const attachCookie = (res, user) => {
  res.cookie('session', UserService.authToken(user), {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  });
};

module.exports = Router()
  .post('/invite', (req, res, next) => {
    UserService
      .create(req.body) 
      .then(user => {
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

  .put('/updatePassword', ensureAuth, (req, res, next) => {
    UserService
      .changePassword(req.user.id, req.body.password)
      .then(user => res.send(user))
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });
