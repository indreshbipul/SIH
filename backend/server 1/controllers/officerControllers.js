const JOI = require('joi')
const bcrypt = require('bcryptjs')

const Officers = require('../models/officerModel')
const authCheck = require('../middleware/authCheck')

const officerValidation = JOI.object({
    firstName : JOI.string().min(3).required().label("First Name"),
    lastName : JOI.string().min(3).label("Last Name"),
    gender : JOI.string().valid('male', 'female', 'others').label("Gender"),
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
            return res.status(409).json({message : "User Already Exists"})
        }
        const id = authCheck.genId()
        const hashPassword = bcrypt.hashSync(value.password, 10);
        const add = new Officers({
            ...value,
            password: hashPassword,
            officerId : id
        })
        await add.save()
        .then(()=>{
            res.status(201).json({message : "Registerd Sucessfully"})
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Internal Server Error"})
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
        if(await bcrypt.compare(password, officer.password)){
            const token = authCheck.genToken(email)
            return res.status(200).cookie("sid",token,{maxAge: 7 * 24 * 60 * 60 * 1000}).json({message : "User Authencited"})
        }
        else{
            return res.status(401).json({message : "Email Id OR Password is Wrong"})   
        }
    }
    catch(err){
        return res.status(500).json({message : "Internal Server Error"})
    }
}

const profile = async(req,res,next)=>{
    const tkn = req.cookies.sid
    console.log(tkn)
    if(!tkn){
        return res.status(401).json({message : "User Session Not Found"})
    }
    const validate = authCheck.verifyToken(tkn)
    if(!validate){
        return res.status(401).json({message : "User Session Not Found"})
    }
    try{
        const user = await Officers.findOne({email: validate.data})
        if(!user){
            return res.status(401).json({message : "User Not Found"})
        }
        return res.status(200).json({
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            mobile : user.mobile
        })
    }
    catch(err){
        console.log('error while fetching profile', err)
        return res.status(500).json('Internal server error')
    }
}

const session = async(req,res,next)=>{
    const tkn = req.cookies.sid
    const validate = authCheck.verifyToken(tkn)
    if(!validate){
        return res.status(409).json({message : "User Session not found"})
    }
    return res.status(200).json({message:"ok"})
}

module.exports = {
    login, signup, profile, session
}