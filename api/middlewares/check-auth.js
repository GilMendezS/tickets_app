const jwt = require('jwt-simple')
const moment = require('moment')
exports.veify_auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({
            message: 'token not present'
        })
    }
    try {
        const token = req.headers.authorization
        const payload = jwt.decode(token, process.env.JWT_KEY)
        if (payload.token_expire_at <= moment().unix() ){
            return res.status(401).json({
                message: 'Token expired'
            })
        }
        req.user = payload
    } catch (error) {
        return res.status(500).json({
            message: 'Token is not valid'
        })
    }
    next()
}