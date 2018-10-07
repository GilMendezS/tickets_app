const Status = require('../models/status')
exports.getStatuses = async (req, res) => {
    try {
        const statuses = await Status.find().sort('status')
        return res.status(200).json({
            success: true,
            data: statuses
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: 'Error fetching statues',
            details: error
        })
    }
}
exports.storeStatus = async (req, res) => {
    if (req.body.status) {
        try {
            const status = new Status()
            status.status = req.body.status
            await status.save()
            return res.status(200).json({
                success: true,
                message: 'New status created',
                data: status
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message:'Error creating the status',
                details: error
            })
        }
    }
    else {
        return res.status(422).json({
            success: false,
            message: 'Name field is required'
        })
    }
}
exports.getStatus = async (req, res) => {
    const statusId = req.params.id
    try {
        const status = await Status.findById(statusId)
        return res.status(200).json({
            success: false,
            data: status
        })    
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: 'Status not found',
            details : error
        })
    }
    
    
}
exports.updateStatus = async (req, res) => {
    const statusId =  req.params.id
    if (req.body.status) {
        try {
            const updatedStatus = await Status.findByIdAndUpdate(statusId, req.body)
            return res.status(200).json({
                success: true,
                message: 'Status updated',
                data: updatedStatus
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error updating the status',
                details: error
            })
        }
    }
    else {
        return res.status(422).json({
            success: false,
            message: 'Name field is required'
        })
    }
}
exports.removeStatus = async (req, res) => {
    const statusId = req.params.id
    try {
        await Status.findByIdAndRemove(statusId)
        return res.status(200).json({
            success: true,
            message: 'Status removed correcytly'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error removing the status',
            details: error
        })
    }
}