const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const cont = require('./controllers/officerControllers')

cont.login()


const app = express()
app.use(express.json())


app.get('/',(req,res,next)=>{
    res.json("Surver is running")
})


port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server is running on port ${port}` )
})