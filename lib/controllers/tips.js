const { Router } = require('express');
const Tip = require('../models/Tip');

module.exports = Router()
  .post('/', (req, res, next) => {
    Tip
      .insert(req.body)
      .then(tip => res.send(tip))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Tip
      .find()
      .then(tips => res.send(tips))
      .catch(next);
  });
