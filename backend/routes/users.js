const router = require('express').Router()
const User = require('../models/User') //יוצר את הקולקשן בMONGODB
const bcrypt = require('bcrypt');

//register
router.post('/register',async(req,res)=>{
    try {
        //generate password
        const salt = await  bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)//יוצר סיסמה מאובטחת חדשה

        //create new user
        const newUser = new User(
            {
                username:req.body.username,
                email:req.body.email,
                password:hashedPassword
            }
        )
        //save user and send res
        const user = await newUser.save()
        res.status(200).json(user._id)
    }catch (err){
        res.status(500).json(err)

    }
})

//login

router.post('/login',async (req,res)=>{
    try{
        //find user
        const user = await User.findOne({username:req.body.username}) //בודק האם היוזר שווה ליוזר בREQ.BODY
        !user && res.status(400).json("wrong username or password")//אם יש שגיאה שולח לו שגיאה

        //validate password
        const validPassword = await bcrypt.compare(req.body.password,user.password) //משווה בין הסיסמאות של היוזר
                                                                                   //והסיסמא המוצפנת שיצרנו

        !validPassword && res.status(400).json("wrong username or password")//אם יש שגיאה שולח לו שגיאה

        //send res
        res.status(200).json({_id:user.id,username:user.username})

    }catch (err){
        res.status(500).json(err)
    }
})


module.exports = router;
