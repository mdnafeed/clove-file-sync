const Enquiry = require("../models/enquiryModel");
const nodemailer = require('nodemailer');

// Nodemailer transporter for Mailtrap
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'cf30376018c879',
        pass: '26c2cbc478f5a4',
    },
    secure: false,
});

exports.enquiry = async(req,res,next) => {
    try{
        const {name,email,mobile,company_name,training_topic,message} = req.body;
        const enquiry = new Enquiry({name,email,mobile,company_name,training_topic,message});
        await enquiry.save();

        // Send email after inserting the record
        const mailOptions = {
            from: 'nafeedjmi@gmail.com',
            to: enquiry.email,
            subject: 'New Record Added with Image Attachment',
            text: `A new record with ID `,
            html: '<p>Embedded image</p>',
        };
        console.log(enquiry)
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
        } catch (error) {
            console.error('Error sending email:', error);
        } finally {
            // Close the MongoDB connection
            // client.close();
        }
        res.json({
            data: enquiry
        })
    }
    catch(error){
        next(error)
    }
}