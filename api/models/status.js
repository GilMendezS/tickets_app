const mongoose = require('mongoose')
const statusSchema = mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    active : {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Status', statusSchema)