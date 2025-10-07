const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
dotenv.config()

const weatherRoutes = require('./routes/weatherRoutes')
const soilRoutes = require('./routes/soilRoutes')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.get('/',(req,res,next)=>{
    res.send('Server Started')
})

app.use('/api',weatherRoutes)
app.use('/api',soilRoutes)

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Server Started at port ${port}`)
})