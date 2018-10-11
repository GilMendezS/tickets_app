const Role = require('../models/role')

exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find()
        return res.status(200).json({
            success: true,
            data: roles
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching roles',
            details: error
        })
    }
}
exports.storeRole = async (req, res) => {
    if (req.body.name) {
        const role = new Role()
        role.name = req.body.name
        role.description = req.body.description
        await role.save()
        return res.status(200).json({
            success: true,
            message: 'Role created correctly',
            data: role
        })
    }
    else {
        return res.status(422).json({
            success: false,
            message: 'Name field is required to create a new role'
        })
    }
}
exports.getRole = async (req, res) => {
    const roleId = req.params.id
    try {
        const role = await Role.findById(roleId)
        if(!role) {
            return res.status(404).json({
                success: false,
                message: 'Role not found',
            })
        }
        else {
            return res.status(200).json({
                success: true,
                data: role
            })
        }
    } catch (error) {
        
    }
}
exports.updateRole = async (req, res) => {
    const roleId = req.params.id
    if (req.body.name) {
        const updatedRole = await Role.findByIdAndUpdate(roleId, req.body)
        return res.status(200).json({
            success: true,
            message: 'Role updated corectly',
            data: updatedRole
        })
    }
    else {
        return res.status(422).json({
            success: false,
            message: 'Name field is required'
        })
    }
}
exports.removeRole = async (req, res) => {
    const roleId = req.params.id
    try {
        await Role.findByIdAndRemove(roleId)
        return res.status(200).json({
            success: true,
            message: 'Role removed correctly'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error removing the role',
            details: erroe
        })
    }
}