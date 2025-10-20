const dashBoardRoutes = require("./dashboard_route.js")
module.exports = (app) => {
    app.use("/admin", dashBoardRoutes)
}