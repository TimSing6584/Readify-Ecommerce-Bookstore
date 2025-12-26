const Category = require("../../models/category_model.js")
const Product = require("../../models/product_model.js")
const User = require("../../models/user_model.js")
const Account = require("../../models/account_model.js")
const Role = require("../../models/role_model.js")
const Order = require("../../models/order_model.js")
// [GET] /admin
module.exports.index = async(req, res) => {
    let general = {
        order: {}
    }
    general.countProducts = await Product.countDocuments({deleted: false})
    general.countCategories = await Category.countDocuments({deleted: false})
    general.countStaff = await Account.countDocuments({deleted: false})
    general.countUser = await User.countDocuments({deleted: false})
    general.countRole = await Role.countDocuments({deleted: false})
    general.order.pending = await Order.countDocuments({deleted: false, status: "pending"})
    general.order.confirmed = await Order.countDocuments({deleted: false, status: "confirmed"})
    general.order.delivered = await Order.countDocuments({deleted: false, status: "delivered"})
    const soldResult = await Product.aggregate([
        { $match: { deleted: false } },
        {
            $group: {
                _id: null,
                totalSold: { $sum: "$sold" }
            }
        }
    ])

    general.sold = soldResult.length > 0 ? soldResult[0].totalSold : 0
    res.render("admin/pages/dashboard/index.pug",{
        titlePage: "Admin Dashboard",
        general: general
    })
}