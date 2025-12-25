// module.exports.[some_name] -> if we need to export multiple things from a single file
const Product = require("../../models/product_model.js")
const Category = require("../../models/category_model.js")
// [GET] /
module.exports.index = async (req, res) => {
    const newest_products = await Product.find({deleted:false}).limit(5).sort({position: "desc"})
    res.render("client/pages/home/index.pug",{
        titlePage: "Home Page",
        newest_products: newest_products
    })
}