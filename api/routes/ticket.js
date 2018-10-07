const express = require('express')
const router = express.Router()
const auth = require('../middlewares/check-auth')
const TicketController = require('../controllers/ticket')
router.get('/', [auth.veify_auth],TicketController.getTickets)
router.post('/',[auth.veify_auth], TicketController.storeTicket)
module.exports = router