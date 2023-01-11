const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types 


const posted = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    image:{
        type:String 
    },
    body:{
        type: String,
        required: true
    },
    postedBy:{
        type: ObjectId,
        ref: "Users"
    },
    likes:[{type:ObjectId,ref:"Users"}],
    comments:[{
        text: String,
        postedBy:{type:ObjectId,ref:"Users"},
        name:String
    }]
})

mongoose.model("Post",posted)
