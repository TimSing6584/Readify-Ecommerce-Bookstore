const Category = require("../../models/category_model.js")
module.exports.create_category = async (req, res, next) => {
    // Make sure category name is not empty
    try{
        // Check if category already exists
        const existed = await Category.findOne({
            name: req.body.name.trim(),
            _id: {$ne: req.params.id},
            deleted: false
        })
        if(existed){
            throw new Error("Your updated name already exists")
        }
        // Prevent the case when user tries to open dev tool to delete required keyword
        if(req.body.name == ""){
            throw new Error("Category can not be empty")
        }
        next()
    }
    catch(error){
        req.flash("error", error.message)
        res.redirect(req.get('referer'))
    }
}