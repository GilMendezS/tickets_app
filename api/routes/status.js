const express = require('express')
const router = express.Router()
const StatusController = require('../controllers/status')
router.get('/',StatusController.getStatuses)
router.get('/:id', StatusController.getStatus)
router.post('/',StatusController.storeStatus)
router.put('/:id', StatusController.updateStatus)
router.delete('/:id', StatusController.removeStatus)
module.exports = router