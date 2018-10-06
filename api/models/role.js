const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})
module.exports = mongoose.model('Role', roleSchema)