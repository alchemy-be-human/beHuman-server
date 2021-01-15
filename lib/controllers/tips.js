const { Router } = require('express');
const Tip = require('../models/Tip');

module.exports = Router()
  .post('/api/v1/tips', (req, res, next) => {
    Tip
      .insert(req.body)
      .then(tip => res.send(tip))
      .catch(next);
  });
