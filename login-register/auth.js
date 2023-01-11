const mongoose = require('mongoose')
const express = require("express")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('./token')
const requireLogin =require('../protected/protected')

const router = express.Router()

const Users = mongoose.model("Users")


router.post('/signup',(req,res)=>{
    const {email , password, name} = req.body
    if(!email || !password || !name){
    return res.status(422).json({error:"not found user"})
    }
    Users.findOne({email: email })
    .then((savedUser)=>{
        if(savedUser){
            console.log("enter another user")
            return res.status(422).json({error: "users is already there"})
        }
        bcrypt.hash(password, 10)
        .then(hashedPassword=>{
            const user = new Users({
                email,
                password: hashedPassword,
                name
            })
            
            user.save()
            .then(user=>{
                res.json({message: 'saved sucessully'})
                console.group("saved sucess")
            })
            .catch(err=>{
                res.json(err)
                console.log(err)
            })
        })
    })
    .catch(err=>{
        res.json(err)
        console.log(err)
    })
})

router.post('/login',(req,res)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(404).json({error: "Enter both email and password"})
    }
    Users.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(404).json({error:"Invalid Email"})
        }else{
            bcrypt.compare(password, savedUser.password)
            .then(doMatch=>{
                if(!doMatch){
                    return res.status(404).json({error:"Invalid Password"})
                }else{
                    // res.json({message:"Succesfully Logined"})
                    const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                    const {_id, name, email, followers, following}= savedUser
                    res.json({token, user:{_id, name, email, followers, following}})
                }
            }).catch((err)=>{
                res.json(err)
                console.log(err)
            })
        }
    }).catch((err)=>{
        res.json(err)
        console.log(err)
    })
})



router.get('/user-info',(req,res)=>{
    Users.find()
    .then(response=>{
        res.json(response)
    })
})



module.exports = router