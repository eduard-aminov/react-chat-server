const { Router } = require('express')
const router = Router()

const Dialog = require('../models/Dialog')

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        await Dialog.findById(id, (err, dialog) => {
            if (err) {
                return res.status(404).json({
                    message: 'Dialog not found'
                })
            }
            res.json(dialog)
        })
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.post('/create', (req, res) => {
    try {
        const postData = {
            authorId: req.body.authorId,
            partnerId: req.body.partnerId
        }

        const dialog = new Dialog(postData)

        dialog.save()
            .then(obj => {
                res.json(obj)
            })
            .catch(reason => {
                res.json(reason)
            })
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        await Dialog.findByIdAndDelete(id, (err, dialog) => {
            if (err) {
                return res.status(404).json({
                    message: 'Dialog not found'
                })
            }
            res.json({
                message: `Dialog was delete`
            })
        })
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

module.exports = router