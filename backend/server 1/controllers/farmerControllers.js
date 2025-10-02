const Farmers = require('../models/farmerModel')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const authCheck = require('../middleware/authCheck')

const farmerValidation = Joi.object({
    firstName : Joi.string().required().min(3).label("First Name"),
    lastName : Joi.string().min(3).label("Last Name"),
    email : Joi.string().email().required().label("Email"),
    mobile : Joi.string().pattern(/^[0-9]{10,15}$/).label("Mobile Number"),
    dateOfBirth : Joi.date().label('Date of Birth'),
    gender : Joi.string().valid('male', 'female', 'others').label("Gender"),
    password : Joi.string().min(8).label("Password")

})

const signup = async(req,res,next)=>{
    const {error,value} = await farmerValidation.validate(req.body)
    if(error){
        return res.status(400).json({message : error.details[0].message})
    }
    try{
        const farmer = await Farmers.findOne({email : value.email})
        if(farmer){
            return res.status(409).json({message : "User Already Exist"})
        }
        const id = authCheck.genId()
        const hashPassword = bcrypt.hashSync(value.password, 10);
        const add =  new Farmers({
            ...value,
            password : hashPassword,
            farmerId : id
        })
        await add.save()
        .then(()=>{
            return res.status(201).json({message : "User Registered"})
        })
        .catch((err)=>{
            console.log(err)
            return res.status(500).json({message : "Internal Server Error"})
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message : "Internal Server Error"})
    }

}

const login = async(req,res,next)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message : "Email Id or Passqord is required"})
    }
    try{
        const farmer = await Farmers.findOne({
            email : email
        })
        if(!farmer){
            return res.status(401).json({message : "Email Id OR Password is Wrong"})            
        }
        if(await bcrypt.compare(password, farmer.password)){
            const token = authCheck.genToken(email)
            return res.status(200).cookie("sid",token,{maxAge: 7 * 24 * 60 * 60 * 1000}).json({message : "User Authencited"})
        }
        else{
            return res.status(401).json({message : "Email Id OR Password is Wrong"})   
        }
    }
    catch(err){
        console.log(err)
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
        const user = await Farmers.findOne({email: validate.data})
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