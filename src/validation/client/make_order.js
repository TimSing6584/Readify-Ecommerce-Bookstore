module.exports.validate_order = (req,res,next) => {
    const orderInfo = req.body
    if(!orderInfo.fullname || !orderInfo.address || !orderInfo.phone){
        req.flash("error", "You need to fill in required information")
        res.redirect(req.get("referrer"))
    }
    else{
        next()
    }
}