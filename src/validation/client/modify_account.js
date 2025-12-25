const User = require("../../models/user_model.js")
module.exports = async (req, res, next) => {
    // Make sure account required fields is not empty
    try{
        // Prevent the case when user tries to open dev tool to delete required keyword
        if(!req.body.fullname || !req.body.email){
            throw new Error("Please fill in required fields")
        }
        // Check if phone/email already exists
        const orConditions = [
            { email: req.body.email }
        ]

        if (req.body.phone && req.body.phone !== "") {
            orConditions.push({ phone: req.body.phone })
        }
        const query = {
            $or: orConditions,
            deleted: false,
            _id: { $ne: req.params.id }
        }
        const existed = await User.findOne(query)
        if(existed){
            throw new Error("Your updated email/phone already exists")
        }
        next()
    }
    catch(error){
        req.flash("error", error.message)
        res.redirect(req.get('referer') || "/")
    }
}