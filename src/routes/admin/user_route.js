const express = require("express")
const controller = require("../../controllers/admin/user_controller.js")
const router = express.Router()

router.get("/", controller.index)
router.delete("/delete/:id", controller.delete)
module.exports = router