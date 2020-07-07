const { Router } = require('express')
const router = Router()

const messageController = require('../controllers/message.controller')
const auth = require('../middlewares/auth.middleware')

router.get('/', auth, (req, res) => messageController.getMessage(req, res))
router.post('/', auth, (req, res) => messageController.createMessage(req, res))
router.delete('/', auth, (req, res) => messageController.deleteMessage(req, res))

module.exports = router