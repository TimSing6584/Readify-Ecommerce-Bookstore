const Product = require("../../models/product_model.js")
const Order = require("../../models/order_model.js")
// [GET] /admin/order
module.exports.index = async (req,res) => {
    const permissions = res.locals.role.permissions
    if(permissions.includes("order-view")){
        let query = {deleted: false}
        const sort_status = req.query.sort_status
        if(sort_status){
            query.status = sort_status
        }
        const orders = await Order.find(query)
                                .sort({createdAt: "desc"})
        res.render("admin/pages/order/index.pug", {
            titlePage: "Order Management",
            orders: orders,
            sort_status: sort_status
        })
    }
    else{
        return
    }
}
// [GET] /admin/order/detail/:id
module.exports.detail = async (req,res) => {
    const permissions = res.locals.role.permissions
    if(permissions.includes("order-view")){
        const order = await Order.findById(req.params.id)
        res.render("admin/pages/order/detail.pug", {
            titlePage: "Order Details",
            products: order.products
        })
    }
    else{
        return
    }
}

// [POST] /admin/order/edit/:id/:status
module.exports.edit = async (req,res) => {
    const permissions = res.locals.role.permissions
    if(permissions.includes("order-edit")){
        await Order.updateOne({_id: req.params.id}, {status: req.params.status})
        req.flash("success", "Updated order status")
        res.redirect("/admin/order")
    }
    else{
        req.flash("error", "You can't modify the status")
        res.redirect("/admin/order")
    }
}