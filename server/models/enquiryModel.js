const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const enquirySchema = new Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true
    },
    mobile:{
        type:String,
        required: true,
        trim:true,
        minLength:10,
        maxLength:15
    },
    company_name:{
        type:String,
        trim:true
    },
    training_topic:{
        type:String,
        trim:true
    },
    message:{
        type:String,
        maxLength:500,
    },
    lastActiveAt:{
        type:Date
    }
})


const Enquiry = mongoose.model('enquiry',enquirySchema)

module.exports = Enquiry;