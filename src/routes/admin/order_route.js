const express = require("express")
const controller = require("../../controllers/admin/order_controller.js")
const router = express.Router()

router.get("/", controller.index)
router.get("/detail/:id", controller.detail)
router.post("/edit/:id/:status", controller.edit)
module.exports = router