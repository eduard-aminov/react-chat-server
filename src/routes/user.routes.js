const { Router } = require('express')
const router = Router()

const auth = require('../middlewares/auth.middleware')
const userController = require('../controllers/user.controller')

router.get('/', auth, (req, res) => userController.getUser(req, res))
router.delete('/', auth, (req, res) => userController.deleteUser(req, res))
router.get('/me', auth, (req, res) => userController.getUser(req, res))
router.get('/dialogs', auth, (req, res) => userController.getUserDialogs(req, res))

module.exports = router