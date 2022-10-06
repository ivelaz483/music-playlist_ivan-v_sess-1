const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    artist:{
        type:String
    },
    duration:{
        type:String
    },
    date: {
        type:String
    },
    link:{
        type:String
    }

})

const song = mongoose.model('song', userSchema)

module.exports = song