const { Router } = require('express');
const Link = require('../models/Link');

module.exports = Router()
  .post('/', (req, res, next) => {
    Link
      .insert(req.body)
      .then(link => res.send(link))
      .catch(next);
  })

  .get('/random', (req, res, next) => {
    Link  
      .getRandom()
      .then(link => res.send(link))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Link
      .findById(req.params.id)
      .then(link => res.send(link))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Link
      .find()
      .then(link => res.send(link))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Link
      .delete(req.params.id)
      .then(link => res.send(link))
      .catch(next);
  });
