const User = require("../../models/user_model.js")
const md5 = require("md5")
// [GET] /my_account
module.exports.index = (req, res) => {
    res.render("client/pages/my_account/index.pug", {
        titlePage: "My Account"
    })
}
// [PATCH] /my_account/edit/:id
module.exports.edit = async (req, res) => {
    if(req.body.password == ""){
        delete req.body.password
    }
    else{
        req.body.password = md5(req.body.password)
    }
    await User.updateOne({_id: req.params.id}, req.body)
    req.flash("success", "Successfully modified your account")
    res.redirect(req.get('referrer'))
}