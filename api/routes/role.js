const express = require('express')
const router = express.Router()
const RoleController = require('../controllers/role')
router.get('/', RoleController.getRoles)
router.post('/', RoleController.storeRole)
router.get('/:id', RoleController.getRole)
router.put('/:id', RoleController.updateRole)
router.delete('/:id', RoleController.removeRole)
module.exports = router