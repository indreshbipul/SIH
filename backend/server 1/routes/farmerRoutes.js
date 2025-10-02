const farmerRoutes = require("express").Router()
const farmerControllers = require('../controllers/farmerControllers')

farmerRoutes.post("/login",farmerControllers.login)
farmerRoutes.post("/signup", farmerControllers.signup)
farmerRoutes.get("/profile", farmerControllers.profile)
farmerRoutes.get("/session",farmerControllers.session)
// farmerRoutes.put("updateProfile")
// farmerRoutes.delete("/deleteProfile")

module.exports = farmerRoutes