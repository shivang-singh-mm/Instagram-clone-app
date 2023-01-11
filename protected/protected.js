const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require('../login-register/token')
const mongoose = require('mongoose')
const User = mongoose.model('Users')
// const requireLogin = require()

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"Not authorised"})
    }

    const token = authorization.replace("Bearer ","")
    // const bearer = authorization.split('')
    // const token = bearer[1];
    jwt.verify(token, JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"You must be looged in"})
        }
        const {_id} = payload
        User.findById(_id).then(userData=>{
            req.user = userData
            next()
        })
    })
}