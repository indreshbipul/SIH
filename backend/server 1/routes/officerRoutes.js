const officerRoutes = require("express").Router()

officerRoutes.post("/login")
officerRoutes.post("/signup")
officerRoutes.get("/profile")
officerRoutes.put("updateProfile")
officerRoutes.delete("/deleteProfile")