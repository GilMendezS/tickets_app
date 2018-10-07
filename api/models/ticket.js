const mongoose  = require('mongoose')
const ticketSchema = mongoose.Schema({
    customer: {
            type: String,
            required: true
    },
    company: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
        required: true
    },
    assigned: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Ticket', ticketSchema)