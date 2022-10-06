const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

//input Schema

const imageSchema = new Schema({
    imageId:{
        type: Number
    },
    name:{
        type: String
    },
    url:{
        type: String
    },
    size:{
        type: String
    }
}, 

{timestamps: true})

const Image = mongoose.model('Image', imageSchema)
module.exports = Image