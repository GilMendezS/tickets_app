const jwt = require('jwt-simple')
const moment = require('moment')
exports.generateToken = async (user) => {
    const payload = {
        sub: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role.name,
        avatar: user.avatar,
        token_creted_at: moment().unix(),
        token_expire_at: moment().add(30, 'days').unix()
    }
    try {
        const token =  await jwt.encode(payload, process.env.JWT_KEY)
        return {
            success: true,
            token
        }
    } catch (error) {
        return {
            success:false,
            message: 'Error creating the token'
        }
    }
}