const express = require('express');
const app =express()
const path    =  require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors({
    origin:["*"],
    credentials:true,
    methods:'*'
}))
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({
    extended:true
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/public')));
//routes

const urlshortenRouter = require('./routes/urlshortner.router.js')

app.use('/shorten',urlshortenRouter)

app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"Welcome! Server running",
    })
})
module.exports=app
