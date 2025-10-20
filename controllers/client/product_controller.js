const Product = require("../../models/product_model.js")
module.exports.index = async (req, res) => {
    const render_product = await Product.find({
        deleted: false,
        stock: { $gt: 0 }
    })
    console.log(render_product)
    res.render("client/pages/products/index.pug", {
        titlePage: "Product Page New",
        products: render_product
    })
}