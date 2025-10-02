const officerRoutes = require("express").Router()
const officerControllers = require('../controllers/officerControllers')

officerRoutes.post("/login", officerControllers.login)
officerRoutes.post("/signup", officerControllers.signup)
officerRoutes.get("/session", officerControllers.session)
officerRoutes.get("/profile", officerControllers.profile)
// officerRoutes.put("updateProfile")
// officerRoutes.delete("/deleteProfile")

module.exports = officerRoutes