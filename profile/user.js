const mongoose = require('mongoose')
const express = require("express")
const requireLogin = require('../protected/protected')
const Post = mongoose.model("Post")
const User = mongoose.model("Users")

const router = express.Router()

router.get('/user/:id',requireLogin,async (req,res)=>{
    await User.find({_id: req.params.id})
    .select('-password')
    .then(async user =>{
        await Post.find({postedBy: req.params.id})
        .populate("postedBy","_id name followers following")
        .exec((err,post)=>{
            if(err){
                return res.status(422).json({error: err})
            }else {
                return res.json({user,post})
            }
        })
    }).catch(err=>res.status(404).json({error: "Not found user"}))
})




module.exports = router