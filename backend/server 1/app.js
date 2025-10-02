const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser")
dotenv.config()

// const farmerRoutes = require('./routes/farmerRoutes')
const officerRoutes = require('./routes/officerRoutes')
const farmerRoutes = require('./routes/farmerRoutes')
const Db = require('./utils/connectDb')

const app = express()
app.use(cookieParser());
app.use(express.json())


app.get('/',(req,res,next)=>{
    res.json("Surver is running")
})
app.use('/api/officer',officerRoutes)
app.use('/api/farmer',farmerRoutes)


port = process.env.PORT
Db()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}` )
    })
})