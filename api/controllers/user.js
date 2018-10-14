const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwtservice =  require('../services/jwt')

exports.login = async (req, res) => {
    
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'This emails does not exists',
            })
        }
        const token = await bcrypt.compare(req.body.password, user.password)
        if(token){
            jwttoken = await jwtservice.generateToken(user)
            if(jwttoken.success){
                return res.status(200).json({
                    success: true,
                    user: user,
                    token: jwttoken.token
                })
            }
            else {
                return res.status(500).json({
                    success: false,
                    message:'Error generating the token'
                })
            }
        }
        else {
            return res.status(200).json({
                success: false,
                message: 'Logins fails, bad password'
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error in login',
            details: error
        })
    }
}
exports.getUsers = async (req, res) => {
    try {
        const users =  await User.find().select('name lastname email active').populate('role', 'name description')
        return res.status(200).json({
            success: true,
            data: users,
            total: users.length
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching data',
            details: error
        })
    }
}
exports.storeUser = async (req, res) => {
    if (req.body.email) {
        const existsEmail = await User.find({ email: req.body.email })
        if (existsEmail.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists.'
            })
        }    
        else {
            if (req.body.password && req.body.name && req.body.lastname && req.body.role) {
                const hash_pwd = await bcrypt.hash(req.body.password, 10)
                const user = new User()
                user.name = req.body.name
                user.lastname = req.body.lastname
                user.password = hash_pwd
                user.role = req.body.role
                user.email = req.body.email

                await user.save()
                return res.status(200).json({
                    success: true,
                    message: 'User created correctly.',
                    data: user
                })
            }
            else {
                return res.statu(422).json({
                    success: false,
                    message: 'All fields are required'
                })
            }
        }
    }
    else {
        return res.status(422).json({
            success: false,
            message: 'All fields are required'
        })
    }
}
exports.getUser = async (req, res) => {
    const userId =  req.params.id
    try {
        const user = User.findById(userId).populate('role', 'name')
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching the user',
            details: erro
        })
    }
}
exports.updateUser = async (req, res) => {
    const userId = req.params.id
    const newData = req.body
    try {
        const userUpdated = await User.findByIdAndUpdate(userId, newData)
        if (!userUpdated) {
            return res.status(500).json({
                success: false,
                message:'Error updating the user'
            })
        }
        else {
            return res.status(200).json({
                success: true,
                message:'User updated correctly',
                data: userUpdated
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Error updating the user',
            details: error
        })
    }
}
exports.removeUser = async(req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {active: false})
        return res.status(200).json({
            success: true,
            message: 'User inactivated',
            data: updatedUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:'Error inactivating the user',
            details: error
        })
    }
}