const User = require("../../models/user_model.js")
// [GET] /admin/user
module.exports.index = async (req, res) => {
    const permissions = res.locals.role.permissions
    if(permissions.includes("user-view")){
        const users = await User.find({deleted: false}).select("-password")
        res.render("admin/pages/user/index.pug", {
            titlePage: "User Manangement",
            users: users
        })
    }
    else{
        return
    }
}
// [DELETE] /admin/user/delete/:id
module.exports.delete = async (req, res) => {
    const permissions = res.locals.role.permissions
    if(permissions.includes("user-delete")){
        await User.updateOne({_id: req.params.id}, {deleted: true, deletedTime: new Date()})
        req.flash("success", "Deleted user account")
        res.redirect("/admin/user")
    }
    else{
        return
    }
}