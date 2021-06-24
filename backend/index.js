const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();
const app = express()
const pinRoute =  require('./routes/pins')
const userRoute =  require('./routes/users')


app.use(express.json())

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology: true }).then(()=>{
    console.log("MONGODB IS CONNECTED")
}).catch((err)=>{
    console.log(err.message,'we got problem with MONGODB')
})

app.use('/api/pins',pinRoute)
app.use('/api/users',userRoute)











app.listen(8800,()=>{
    console.log('backend server is running!!!!')
})
