
// import mongoose to create new Schema
const mongoose = require("mongoose")

const BugSchema = new mongoose.Schema({
    bugName:{
        type:String,
        required:true
    },
    bugStatus:{
        type:String,
        required:true,
        default:"Open"
    },
    bugLocation:{
        type:String,
        required:true
    },
    bugDescription:{
        type:String,
        required:true
    },
    bugPriority:{
        type:String,
        required:true,
        default:"Normal"
    }

})


module.exports = mongoose.model("bug",BugSchema)
