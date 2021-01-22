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
  })

  .get('/random', (req, res, next) => {
    Tip
      .getRandom()
      .then(tips => res.send(tips))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Tip
      .update(req.params.id, req.body)
      .then(tip => res.send(tip))
      .catch(next);
  })
  
  .delete('/:id', (req, res, next) => {
    Tip
      .delete(req.params.id)
      .then(tip => res.send(tip))
      .catch(next);
  });
