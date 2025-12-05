const Product = require("../../models/product_model.js")

// [GET] /product
module.exports.index = async (req, res) => {
    const render_product = await Product.find({
        deleted: false,
        stock: { $gt: 0 },

    }).sort({position: 1})
    console.log(render_product)
    res.render("client/pages/products/index.pug", {
        titlePage: "Product Page",
        products: render_product
    })
}