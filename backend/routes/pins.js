const router = require('express').Router()
const Pin = require('../models/Pin')

//Create a Pin
router.post('/',async (req,res)=>{
    const newPin = new Pin(req.body) //req.body מחזיק את כל המידע שלנו וזה מה שאני שולח
    try{
    const savedPin  = await newPin.save()
        res.status(200).json(savedPin)
    }
    catch (err){
        res.status(500).json(err)
        console.log(err,'we got error in pins route')
    }
})

//get all pins
router.get('/',async (req,res) =>{
    try{
        const pins = await Pin.find()
        res.status(200).json(pins)
    }catch (err){
        res.status(500).json(err)

    }
})





module.exports = router;
