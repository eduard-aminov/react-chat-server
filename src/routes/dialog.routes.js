const { Router } = require('express')
const router = Router()

const auth = require('../middlewares/auth.middleware')
const dialogController = require('../controllers/dialog.controller')

router.get('/', auth, (req, res) => dialogController.getDialog(req, res))
router.post('/', auth, (req, res) => dialogController.createDialog(req, res))
router.delete('/', auth, (req, res) => dialogController.deleteDialog(req, res))
router.get('/messages', auth, (req, res) => dialogController.getDialogMessages(req, res))

module.exports = router