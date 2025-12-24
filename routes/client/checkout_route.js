const express = require("express")
const router = express.Router()
const controller = require("../../controllers/client/checkout_controller.js")
const make_order_validator = require("../../validation/client/make_order.js")

router.get("/", controller.index)
router.post(
    "/order",
    make_order_validator.validate_order,
    controller.order
)
router.get("/success/:order_id", controller.success)
module.exports = router