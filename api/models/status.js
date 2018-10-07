const mongoose = require('mongoose')
const statusSchema = mongoose.Schema({
    status: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Status', statusSchema)