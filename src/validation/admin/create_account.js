// This validator is re-used for both CREATE + EDIT account
const Account = require("../../models/account_model.js")
module.exports.create_account = async (req, res, next) => {
    // Make sure account required fields is not empty
    try{
        console.log(req.body)
        // Prevent the case when user tries to open dev tool to delete required keyword
        let empty = !req.body.fullname || !req.body.email || !req.body.phone || !req.body.role
        if(!req.params.id){
            // If not /:id, meaning that we are creating new account -> password is required
            empty = empty || !req.body.password
        }
        if(empty){
            throw new Error("Please fill in required fields")
        }
        if(!req.params.id && req.body.password.length < 8){
            throw new Error("Please use a password that is at least 8 characters long")
        }
        // Check if email/phone already exists
        const query = {
            $or: [
                { phone: req.body.phone },
                { email: req.body.email }
            ],
            deleted: false
        }

        // If editing -> /:id on url, exclude current role
        // If creating -> no /:id on url
        if (req.params.id) {
            query._id = { $ne: req.params.id }
        }

        const existed = await Account.findOne(query)
        if(existed){
            throw new Error("Your updated email/phone already exists")
        }
        next()
    }
    catch(error){
        req.flash("error", error.message)
        res.redirect(req.get('referer'))
    }
}