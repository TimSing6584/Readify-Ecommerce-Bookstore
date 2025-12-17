const express = require("express")
const controller = require("../../controllers/admin/role_controller.js")
const create_role_validator = require("../../validation/admin/create_role.js")
const router = express.Router()

router.get("/", controller.index)
router.get("/edit/:id", controller.edit_get)
router.patch(
    "/edit/:id",
    create_role_validator.create_role,
    controller.edit_patch)
router.delete("/delete/:id", controller.delete)
router.get("/create", controller.create_get)
router.post(
    "/create",
    create_role_validator.create_role,
    controller.create_post
)
router.get("/permission", controller.permission_get)
router.patch("/permission", controller.permission_patch)
module.exports = router