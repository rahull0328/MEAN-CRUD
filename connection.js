// third-party modules
const express = require('express')
const app = express()
const mongoose = require('mongoose')

// Middlewares
app.use(express.static('Public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// 1. Connect with mongodb
mongoose.connect('mongodb://127.0.0.1:27017/crud')
const conn = mongoose.connection
conn.on('connected',()=>{
    console.log('MongoDB Connected')
})
// Creating Schema 
const studSchema = mongoose.Schema({
    sID:String,
    sName:String,
    course:String,
    age:Number
})
// Creating Model
const stud = mongoose.model('stud',studSchema,'studentInfo')

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/Public/studApp.html')
})

// API to read student Data
app.get('/api/getStud',(req,res)=>{
    stud.find().then((data)=>{
        res.send(data)
    })
})

// API to Add student Data
app.post('/api/addStud',(req,res)=>{
    const {sID,sName,course,age} = req.body
    const newData = new stud({sID,sName,course,age})
    newData.save()
    res.json({message:'Student Data Added'})

})

// API to delete
app.delete('/api/delete/:sID',(req,res)=>{
    const id = req.params.sID
    stud.deleteOne({sID:id}).then(()=>{
        res.json({message:`Student ID ${id} deleted`})
    })
})

// API to edit
app.put('/api/studEdit/:sID',(req,res)=>{
    const id = req.params.sID
    const upData = req.body
    stud.updateOne({sID:id},upData).then((data)=>{
        res.json({message:`Student ID ${id} updated`})
    })
})
app.listen('3000',()=>{
    console.log('Server is running on http://127.0.0.1:3000')
})