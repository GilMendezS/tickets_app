const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
router.get('/', UserController.getUsers)
router.post('/', UserController.storeUser)
router.post('/login', UserController.login)
router.get('/:id', UserController.getUser)
router.put(':/id', UserController.updateUser)
module.exports= router