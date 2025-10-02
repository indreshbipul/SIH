const farmerRoutes = require("express").Router()

farmerRoutes.post("/login")
farmerRoutes.post("/signup")
farmerRoutes.get("/profile")
farmerRoutes.put("updateProfile")
farmerRoutes.delete("/deleteProfile")