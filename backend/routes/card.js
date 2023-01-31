const express = require('express')
const Card = require('../models/cardModel')
const Authen = require('../models/authenModel')
const Users = require('../models/userModel')
const router = express.Router()
const multer = require('multer')
const path = require('path')


// GET a single card
router.get('/:id', async (req, res) => {
    try {
        const card = await Card.findById(req.params.id)
        res.status(200).json(card)
    } catch (error) {
        res.status(400).json({ error: error})
    }
})

router.get('/show/cards/:current/:perPage', async (req, res) => {
    try {
        let like = ''
        if (req.query.q != '') {
            like = req.query.q
        }
        
        const query = { $and: [{ statusImg:  { $ne: "review"} }, { statusMsg: "approved" } ], $or: [{ name: { $regex: like}}, {organization: {$regex: like }}] }

        let skip = (req.params.current - 1) * req.params.perPage
        let limit = req.params.perPage;

        const cards = await Card.find().count()
        const cardsShow = await Card.find().and(query).skip(skip).limit(limit).sort({createdAt: 'desc'})

        res.status(200).json({
            cards: cardsShow,
            total: cards,
            current: req.params.current,
            perPage: req.params.perPage
        })
    } catch (error) {
        res.status(400).json({ error: error})
    }
})

router.get('/authen/:key', async (req, res) => {
    try {
        const admin = await Authen.find({ key: req.params.key })
        res.status(200).json(admin)
    } catch (error) {
        res.status(400).json({ error: error})
    }
})

router.get('/all/total', async (req, res) => {
    try {
        const card = await Card.find({})
        res.status(200).json(card)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error})
    }
})

router.get('/status/:status', async (req, res) => {
    try {
        let query;
        if (req.params.status == 'approved') {
            query = { statusMsg: 'approved' }
        } else {
            query = { $or: [{ statusImg:  req.params.status }, { statusMsg: req.params.status }] }
        }
        
        const card = await Card.find(query).sort({createdAt: 'desc'})
        res.status(200).json(card)
    } catch (error) {
        res.status(400).json({ error: error})
    }
})

// POST a new card
var upload = multer ({
    storage: multer.diskStorage ({
        destination: (req, file, cb) => {
            cb (null, './uploads/avatar')
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) + '.webp')
        }
    })
})

var type = upload.single('avatar')

router.post('/', type, async (req, res) => {
    const { message, name, organization, cardFileName, ready, statusMsg, statusImg } = req.body
    var avatar = req.file ? req.file.filename : null

    try {
        const card = await Card.create({message, name, organization, avatar, cardFileName, ready, statusMsg, statusImg})
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
router.patch('/update-card', async (req, res) => {
    const filter = { _id: req.body._id };
    const update = { statusMsg: req.body.statusMsg, statusImg: req.body.statusImg, ready: req.body.ready };

    try {
        const card = await Card.findOneAndUpdate(filter, update);
        res.status(200).json(card)
    } catch (error) {
        res.status(400).json({ error: error})
    }
})


module.exports = router