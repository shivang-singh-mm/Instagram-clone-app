const mongoose = require('mongoose')
const express = require("express")
const requireLogin = require('../protected/protected')
const Users = mongoose.model("Users")


const router = express.Router()


router.put('/follow',requireLogin, (req,res)=>{
    Users.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    }, async (err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      await Users.findByIdAndUpdate(req.user._id,{
          $push:{following:req.body.followId}
          
      },{new:true})
      .select("-password")
      .then(result=>{
        res.json(result)
    }).catch(err=> {
        return res.status(422).json({error:err})
    })

    }
    )
})

router.put('/unfollow',requireLogin,(req,res)=>{
    Users.findByIdAndUpdate(req.body.followId,{
        $pull:{followers:req.user._id}
    },{new:true}
    ,(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        Users.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.followId}
        },{new: true})
        .select("-password") 
        .then(result=>{
            res.json(result)
        }).catch(err=> {
            return res.status(422).json({error:err})
        })
    })
})









module.exports = router