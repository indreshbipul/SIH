const JOI = require('joi')
const bcrypt = require('bcryptjs')

const Officers = require('../models/officerModel')
const authCheck = require('../middleware/authCheck')

const officerValidation = JOI.object({
    firstName : JOI.string().min(3).required().label("First Name"),
    lastName : JOI.string().min(3).label("Last Name"),
    gender : JOI.string().label("Gender"),
    email: JOI.string().email().required().label("Email ID"),
    dateOfBirth : JOI.date().label("Date OF Birth"),
    password : JOI.string().required().label("Password"),
    mobile : JOI.string().pattern(/^[0-9]{10,15}$/).label("Mobile Number")

})

const signup = async(req,res,next)=>{
    const { error, value } = await officerValidation.validate(req.body);
    if(error){
        return res.status(400).json({
            message : error.details[0].message
        })
    }
    try{
        const officer = await Officers.findOne({
            email : value.email
        })
        if(officer){
            return res.status(401).json({message : "User ALready Exists"})
        }
        const id = authCheck.genId()
        const add = new Officers({
            ...value,
            officerId : id
        })
        await add.save()
        .then(()=>{
            res.status(200).json({message : "Registerd Sucessfully"})
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Internal Server Error"},err)
    }
}

const login = async(req,res,next)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message : "Email Id or Passqord is required"})
    }
    try{
        const officer = await Officers.findOne({
            email : email
        })
        if(!officer){
            return res.status(401).json({message : "Email Id OR Password is Wrong"})            
        }
        if(password === officer.password){
            const token = authCheck.genToken(email)
            return res.status(200).cookie("sid",token,{maxAge: 7 * 24 * 60 * 60 * 1000}).json({message : "User Authencited"})
        }
    }
    catch(err){
        return res.status(500).json({message : "Internal Server Error"})
    }
}

module.exports = {
    login, signup
}