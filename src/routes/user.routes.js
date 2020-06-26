const { Router } = require('express')
const router = Router()

const User = require('../models/User')

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        await User.findById(id, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            res.json(user)
        })
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        await User.findByIdAndDelete(id, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            res.json({
                message: `User ${user.username} was delete`
            })
        })
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

module.exports = router