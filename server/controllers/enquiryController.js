const Enquiry = require("../models/enquiryModel");

exports.enquiry = async(req,res,next) => {
    try{
        const {name,email,mobile,company_name,training_topic,message} = req.body;
        const enquiry = new Enquiry({name,email,mobile,company_name,training_topic,message});
        await enquiry.save();
        res.json({
            data: enquiry
        })
    }
    catch(error){
        next(error)
    }
}