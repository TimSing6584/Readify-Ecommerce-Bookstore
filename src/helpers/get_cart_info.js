const Product = require("../models/product_model")
module.exports = async (cartProducts) => {
    let products = []
    let totalPrice = 0
    for(let obj of cartProducts){
        let product = await Product.findById(obj.product_id).lean()
        product.priceNew = (((100 - product.discountPercentage) * product.price) / 100).toFixed(0)
        product.totalPrice = product.priceNew * obj.quantity
        product.quantity = obj.quantity
        totalPrice += product.totalPrice
        products.push(product)
    }
    return {
        products: products,
        totalPrice: totalPrice
    }
}