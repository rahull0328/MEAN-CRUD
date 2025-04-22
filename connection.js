//third party modules
const express = require('express')
const app = express()
const mongoose = require('mongoose')

//middlewares
app.use(express.static('Public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//connecting to mongoDB
mongoose.connect('mongodb://localhost:27017/crud')
const conn = mongoose.connection
conn.on('connected',()=>{
  console.log('MongoDB Connected')
})

//creating the schema
const userSchema = mongoose.Schema({
  id: String,
  name: String,
  course: String,
  age: Number,
})

//creating the model
const user = mongoose.model('user', userSchema, 'userInfo')

//displaying the ui on server
app.get('/', (req, res)=>{
  res.sendFile(__dirname+'/Public/index.html')
})

//api for fetching user data
app.get('/api/getUser/', (req, res)=>{
  user.find().then((data)=>{
    res.send(data)
  })
})

//api for inserting the data
app.post('/api/newUser/',(req, res)=>{
  const {id, name, course, age} = req.body;
  const newData = new user({id, name, course, age})
  newData.save()
  res.json({message: "New User Added"})
})

//api for updating the data
app.put('/api/updateUser/:id', (req, res)=>{
  const userId = req.params.id
  const updateData = req.body
  user.updateOne({id: userId}, updateData).then((data)=>{
    res.json({message:`User with ${userId} Updated!`})
  })
})

app.delete('/api/deleteUser/:id', (req, res)=>{
  const userId = req.params.id
  user.deleteOne({id: userId}).then(()=>{
    res.json({message:`User with ${userId} deleted!`})
  })
})

app.listen(3000, ()=>{
  console.log('Server Started on http://127.0.0.1:3000')
})