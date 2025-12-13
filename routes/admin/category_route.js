const express = require("express")
const controller = require("../../controllers/admin/category_controller.js")
const router = express.Router()

router.get("/", controller.index)

module.exports = router