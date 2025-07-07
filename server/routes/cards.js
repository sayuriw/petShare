const router = require('express').Router()
const Card = require('../models/Card')

router.get('/', async (req, res) => {
  try {
    const cards = await Card.find()
    res.json(cards)
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
})

router.get('/delete-test-cards', async (req, res) => {
  try {
    const cards = await Card.find({ title: 'New test Card' })
    await Promise.all(cards.map(card => card.remove()))
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const cards = await Card.find({ id: req.params.id })
    if (!cards || cards.length === 0) {
      return res.status(404).json({ success: false, message: 'Cards not found' })
    }
    res.json(cards)
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
})

router.post('/', async (req, res) => {
  try {
    const card = await Card.create(req.body)
    res.status(201).json(card)
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!card) {
      return res.status(404).json({ success: false, message: 'Card not found' })
    }
    res.json(card)
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id)
    if (!card) {
      return res.status(404).json({ success: false, message: 'Card not found' })
    }
    res.json(card)
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
})

module.exports = router