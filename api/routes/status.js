const express = require('express')
const router = express.Router()
const StatusController = require('../controllers/status')
router.get('/',StatusController.getStatuses)
router.post('/',StatusController.storeStatus)
router.put(':id', StatusController.updateStatus)
module.exports = router