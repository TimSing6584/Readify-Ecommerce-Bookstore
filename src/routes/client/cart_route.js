const express = require("express")
const router = express.Router()
const controller = require("../../controllers/client/cart_controller.js")

router.get("/", controller.index)
router.post("/add/:product_id", controller.add)
router.get("/delete/:product_id", controller.delete)
router.get("/update_quantity/:product_id/:quantity", controller.update)
module.exports = router