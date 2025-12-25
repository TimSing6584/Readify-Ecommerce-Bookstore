module.exports.requireAuth = (req, res, next) => {
    if (!res.locals.user) {
        return res.redirect("/auth")
    }
    next()
}