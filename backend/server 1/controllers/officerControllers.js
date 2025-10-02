const cookie = require("cookie-parser")
const authCheck = require('../middleware/authCheck')
const JOI = require('joi')
const Joi = require("joi")

const officerValidation = Joi.object({
    firstName : JOI.string().min(3).required().label("First Name"),
    lastName : JOI.string().min(3).label("Last Name"),
    email : JOI.email().require().label("Email ID"),
    dob : JOI.date().required().label("Date OF Birth")

})

const signup = (req, res, next)=>{

}

const login = async(req,res,next)=>{
    const tkn = authCheck.genToken("indresh@gmail.com")
    console.log(authCheck.genId())
    console.log(authCheck.verifyToken(tkn))
}

module.exports = {
    login
}