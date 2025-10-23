const Product = require("../../models/product_model.js")
const filterStockHelper = require("../../helpers/filter_stock.js")
const searchHelper = require("../../helpers/search.js")
// [GET] /admin/product
module.exports.index = async (req, res) => {
    let filter = {
        deleted: false
    }
    // Filter by stock
    if (req.query.stock === "instock"){
        filter.stock = {$gt: 0}
    }
    else if(req.query.stock === "outofstock"){
        filter.stock = {$lte: 0}
    }
    // End Filter by stock

    // Define filter buttons
    // List of buttons we render on the page for client to filter
    let filterButtons = filterStockHelper(req)
    // End Define filter buttons

    // Filter by search keyword:
    const last_search_word = searchHelper(req)
    if(last_search_word){
        filter.title = {$regex: last_search_word, $options: "i"}
    }
    // End filter by search keyword




    const fileredProducts = await Product.find(filter)
    res.render("admin/pages/products/index.pug", {
        titlePage: "Admin Product Page",
        products: fileredProducts,
        filterButtons: filterButtons,
        last_search_word: last_search_word
    })
}