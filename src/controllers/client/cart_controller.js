const Cart = require("../../models/cart_model.js")
const Product = require("../../models/product_model.js")
const cart_info_helper = require("../../helpers/get_cart_info.js")
// [GET] /cart
module.exports.index = async (req, res) => {
    const cartInfo = await cart_info_helper(res.locals.cart.products)
    res.locals.totalPrice = cartInfo.totalPrice
    res.render("client/pages/cart/index.pug", {
        titlePage: "Your Cart",
        products: cartInfo.products
    })
}
// [POST] /cart/add/:product_id
module.exports.add = async (req,res) => {
    const product_id = req.params.product_id
    const quantity = req.body.quantity
    const cartId = req.cookies.cartId
    const result = await Cart.updateOne(
        {
            _id: cartId,
            "products.product_id": product_id
        },
        {
            $inc: {"products.$.quantity": quantity}
        }
    )

    if (result.matchedCount === 0) {
        await Cart.updateOne(
            {_id: cartId},
            {
                $push: {
                    products: {product_id, quantity}
                }
            }
        )
    }
    req.flash("success", "Added product to cart")
    res.redirect(req.get('referrer'))
}
// [GET] /cart/delete/:product_id
module.exports.delete = async (req,res) => {
    const product_id = req.params.product_id
    const cart_id = req.cookies.cartId
    await Cart.updateOne({_id: cart_id}, {
        $pull: {products: {product_id: product_id}}
    })

    req.flash("success", "You have successfully deleted product")
    res.redirect(req.get("referrer"))
}
// [GET] /cart/update_quantity/:product_id/:quantity
module.exports.update = async (req, res) => {
    const { product_id, quantity } = req.params
    const cart_id = req.cookies.cartId

    await Cart.updateOne(
        {
            _id: cart_id,
            "products.product_id": product_id
        },
        {
            $set: {
                "products.$.quantity": quantity
            }
        }
    )
    req.flash("success", "You have successfully updated quantity")
    res.redirect(req.get("referrer"))
}
