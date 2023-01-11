const mongoose = require('mongoose')
const express = require("express")
const requireLogin = require('../protected/protected')
const Post = mongoose.model("Post")
const fs = require('fs')


const router = express.Router()




router.get('/allposts',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
    
})





router.post('/createpost',requireLogin,(req,res)=>{
    const {title, body,image} = req.body
    const saveImage = new Post({
        title,
        image,
        body,
        postedBy:req.user
    })
    saveImage.save().then(result=>{
         res.json({post: result})
         console.log('sucess')
    }  
    ).catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id email")
    .then(myPost=>{
        res.json({myPost})
    }).catch(err=>{
        res.json(err)
    })
})

router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else {
            res.json(result)
        }
    })
    
})

router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else {
            res.json(result)
        }
    })
    
})

router.put('/comment',requireLogin,(req,res)=>{

    const comment = {
        text:req.body.text,
        postedBy: req.body._id,
    }

    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else {
            res.json(result)
        }
    })
    
})


module.exports = router