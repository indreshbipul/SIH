const Mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        await Mongoose.connect(process.env.DB_STRING).then(()=>{
            console.log("Database Connected ")
        })
        
    }
    catch(err){
        console.log("Error while connecting to DB")
    }
    
}

module.exports = connectDB