const router = require('express').Router()
const Card = require('../models/Card')

router.get('/', (req, res) => {
  Card.find()
    .then(cards => res.json(cards))
    .catch(err => res.json(err))
})

router.get('/:id', (req, res) => {
  Card.find({ id: req.params.id })
    .then(cards => res.json(cards))
    .catch(err => res.json(err))
})

router.post('/', (req, res) => {
  Card.create(req.body)
    .then(card => res.json(card))
    .catch(err => res.json(err))
})

router.patch('/:id', (req, res) => {
  Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(card => res.json(card))
    .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then(card => res.json(card))
    .catch(err => res.json(err))
})

module.exports = router