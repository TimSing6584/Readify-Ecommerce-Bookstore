// This validator is re-used for both CREATE + EDIT role
const Role = require("../../models/role_model.js")
module.exports.create_role = async (req, res, next) => {
    // Make sure role name is not empty
    try{
        // Prevent the case when user tries to open dev tool to delete required keyword
        if(req.body.name == ""){
            throw new Error("Role can not be empty")
        }
        // Check if role already exists
        const query = {
            name: req.body.name,
            deleted: false
        }

        // If editing -> /:id on url, exclude current role
        // If creating -> no /:id on url
        if (req.params.id) {
            query._id = { $ne: req.params.id }
        }

        const existed = await Role.findOne(query)
        if(existed){
            throw new Error("Your updated name already exists")
        }
        next()
    }
    catch(error){
        req.flash("error", error.message)
        res.redirect(req.get('referer'))
    }
}