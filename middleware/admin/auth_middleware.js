const jwt = require("jsonwebtoken")

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.redirect("/admin/auth/login")
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY)
        // if verify passes, just continue
        next()
    } catch (err) {
        return res.redirect("/admin/auth/login")
    }
}
