const express = require('express')
const Card = require('../models/cardModel')
const router = express.Router()

// GET all workouts
router.get('/', (req, res) => {
    res.json({msg: 'GET all workouts'})
})

// GET a single workout
router.get('/id/:id', async (req, res) => {
    try {
        const card = await Card.findById(req.params.id)
        res.status(200).json(card)
    } catch (error) {
        res.status(400).json({ error: error})
    }
})

router.get('/all', async (req, res) => {
    try {
        const card = await Card.find({})
        res.status(200).json(card)
    } catch (error) {
        res.status(400).json({ error: error})
    }
})

// POST a new card
router.post('/', async (req, res) => {
    const { message, name, organization, image, cardFileName, ready } = req.body
    var imgBuffer = {
        contentType:req.file.mimetype,
        image:new Buffer(image)
    }
    try {
        const card = await Card.create({message, name, organization, image, cardFileName, ready})
        res.status(200).json(card)
    } catch (error) {
        res.status(400).json({ error: error})
    }
})

// DELETE a card
router.delete('/:id', (req, res) => {
    res.json({msg: 'DELETE a workout'})
})

// UPDATE a card
router.patch('/:id', (req, res) => {
    res.json({msg: 'UPDATE a workout'})
})


module.exports = router