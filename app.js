const express = require('express')
const mongoose = require('mongoose')
const MONGOURI = require('./keys')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 6000
const path = require('path')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=>{
    console.log('good')
})
mongoose.connection.on('error',(err)=>{
    console.log('bad')
})

app.use(express.json())

require('./models/users')
require('./models/post-database')

app.use(require('./login-register/auth'))
app.use(require('./post-stuff/post'))
app.use(require('./profile/user'))
app.use(require('./followers-following/route'))

app.use(express.static(path.join(__dirname,"./client/build")))
app.get("*",function(_,res){
    res.sendFile(
        path.join(__dirname,"./client/build/index.html"),
        function(err){
            res.status(500).send(err);
        }
    )
})


app.listen(PORT)
