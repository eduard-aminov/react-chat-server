const { Router } = require('express')
const router = Router()

const authController = require('../controllers/auth.controller')
const validator = require('../utils/validators')

router.post('/register', validator.email(), (req, res) => authController.register(req, res))
router.post('/login', validator.login(), (req, res) => authController.login(req, res))

module.exports = router