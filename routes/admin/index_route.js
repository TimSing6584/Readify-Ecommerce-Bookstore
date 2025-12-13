const dashBoardRoutes = require("./dashboard_route.js")
const productRoutes = require("./product_route.js")
const categoryRoutes = require("./category_route.js")
module.exports = (app) => {
    app.use("/admin", dashBoardRoutes)
    app.use("/admin/product", productRoutes)
    app.use("/admin/category", categoryRoutes)
}