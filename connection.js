//third party modules
const express = require('express')
const app = express()
const mongoose = require('mongoose')

//middleware
app.use(express.static('Public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//connecting to mongoDB
mongoose.connect('mongodb://localhost:27017/crud')
const conn = mongoose.connection
conn.on('connected', ()=>{
  console.log("MongoDB Connected")
})

//creating the schema
const userSchema = mongoose.Schema({
  userId: String,
  username: String,
  email: String,
  age: Number
})

//creating the model
const user = mongoose.model('user', userSchema, 'userInfo')

//rendering the ui on server
app.get('/', (req, res)=>{
  res.sendFile(__dirname+'/Public/index.html')
})

//api for reading the data from database
app.get('/api/getUsers/', (req, res)=>{
  user.find().then((data)=>{
    res.send(data)
  })
})

//api for 

app.listen(3000, ()=>{
  console.log("Server running on http://127.0.0.1:3000")
})
