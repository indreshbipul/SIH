import express from 'express'
import {config} from "dotenv"
config()

const app = express()
app.use(express.json())

import route from './routes/routes.js'

app.get('/',(req,res,next)=>{
    res.send(`Hello from AI Agent Made by 'INDRESH' `)
})

app.use('/api',route)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on Port ${process.env.PORT}`)
})