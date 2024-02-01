
const fs = require("node:fs")
const express = require("express")
const mongoose = require("mongoose")

const app = express()
const port = 3000

const User = require("./model/user")

app.use(express.urlencoded({extendend: true}))

mongoose.connect("mongodb://127.0.0.1:27017/UserDataDB").then(()=>{
    console.log("Database connected")
}).catch((e)=>{
    console.log(e)
    console.log("not connect")
})

app.get("/", (req,res)=>{
    let a=fs.readFileSync("index.html")
    res.send(a.toString())
})

app.post("/", async(req, res) =>{
    const userData = new User(req.body)
    await userData.save()
    let a=fs.readFileSync("submit.html")
    res.send(a.toString())
})



app.listen(port, ()=>{
     console.log("App running on port : ", port)
})