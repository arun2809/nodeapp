const express = require('express')
const mongoose = require('mongoose')
const usermodel = require('./datamodel')
const path = require('path')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise

const app = new express()

 app.use('/',express.static(path.join(__dirname,'public')))
mongoose.connect('mongodb://localhost/demodata',{useNewUrlParser:true})

//usermodel.insertMany({"name":"rakesh","email":"email@gmail.com","address":"kamalua"})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/form/savedata',(req,res)=>{
  usermodel({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address
 }).save(function(err,result){
     if(err) res.json(err)
     else res.send('success')
 })
     
 })


app.get("/showdata",(req,res)=>{
    usermodel.find().select()
    .lean()
    .exec((err ,result)=>{
        if(err) {
            console.log(err)
            res.send(err)
        }

        else if(result == '' || result == undefined || result == null)
        {
            console.log("result not found")
        }
        else{
            console.log(result)
            res.send(JSON.stringify(result))
        }
    })
})





mongoose.connection.on('open',(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("connection success")
    }
})


app.listen(3000,()=>{
    console.log("listening at 3000")
})