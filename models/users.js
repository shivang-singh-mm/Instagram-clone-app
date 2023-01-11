const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        //required: true
    },
    name: {
        type: String,
        // required: true
    },
    followers:[{type:ObjectId,ref:"Users"}],
    following:[{type:ObjectId,ref:"Users"}]
})

mongoose.model('Users',userSchema)