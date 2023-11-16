const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    mobileno:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        default:""
    },
    pincode:{
        type:Number,
        default:""
    }
}, { timestamps: true })

const User = mongoose.model("User",UserSchema)

module.exports = User