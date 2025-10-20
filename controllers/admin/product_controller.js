const Product = require("../../models/product_model.js")

// [GET] /admin/product
module.exports.index = async (req, res) => {
    const allProducts = await Product.find({})
    res.render("admin/pages/products/index.pug", {
        titlePage: "Admin Product Page",
        products: allProducts
    })
    // console.log(allProducts)
}