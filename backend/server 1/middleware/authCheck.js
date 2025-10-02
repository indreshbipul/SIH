const jwt = require('jsonwebtoken');
const uuidV4  = require('uuid').v4

const genId = ()=>{
    return uuidV4()
}

const genToken = (data) => {
    try{
        return jwt.sign({
            data : data,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        },process.env.SECRET_KEY);
    }
    catch(err){
        console.log("Error while generating Token",err)
    }
};

const verifyToken = (tkn)=>{
    try{
        return jwt.verify(tkn, process.env.SECRET_KEY)
    }
    catch{
        return false
    }
} 

module.exports = {genToken, genId, verifyToken};
