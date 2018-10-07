const Ticket =  require('../models/ticket')
exports.getTickets = async (req, res) => {
    
    try {
        const tickets = await Ticket.find()
        .populate('creator')
        .populate('status')
        .populate('assigned')
        return res.status(200).json({
            success: true,
            data: tickets
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            messsage: 'Error fetching the tickets',
            details: error
        })
    }
}
exports.storeTicket =  async (req, res) => {
    
    if (req.body.customer && req.body.company && req.body.subject && req.body.description
        && req.body.assigned && req.body.status) {
        const ticket = new Ticket()
        ticket.customer = req.body.customer
        ticket.company =  req.body.company
        ticket.subject = req.body.subject
        ticket.description = req.body.description
        ticket.status = req.body.status
        ticket.assigned = req.body.assigned
        ticket.creator  = req.user.sub
        try {
            await ticket.save()
            return res.status(200).json({
                success: true,
                message: 'Ticket created',
                data: ticket
            })    
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error storing the ticket',
                details: error
            })
        }
        
        
    }
    else {
        return res.status(422).json({
            success: false,
            message: 'All fields are required'
        })
    }
}
exports.getTicket = async (req, res) => {
    const ticketId = req.params.id
    try {
        const ticket = await Ticket.findById(ticketId)
        if(!ticket){
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            })
        }
        return res.status(200).json({
            success: true,
            data: ticket
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching the ticket',
            details: error
        })
    }
}
exports.updateTicket = async (req, res) => {
    const ticketId = req.params.id
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, req.body)
        return res.status(200).json({
            success: true,
            message: 'Ticket updated correctly',
            data: updatedTicket
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating the ticket',
            details: error
        })
    }
}
exports.removeTicket = async (req, res) => {
    const ticketId = req.params.id
    try {
        await Ticket.findByIdAndRemove(ticketId)
        return res.status(200).json({
            success: true,
            message: 'Ticket deleted correctly'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error removing the ticket',
            details: error
        })
    }
}