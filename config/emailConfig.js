const nodemailer = require("nodemailer");
require("dotenv").config()

const transporter = nodemailer.createTransport({
        host : process.env.MAIL_HOST,
        port : 465,
        secure : true,
        auth:{
            user : process.env.MAIL_USER,
            pass : process.env.MAIL_PASS
        }
}) 

module.exports = transporter;

// const transporter = nodemailer.createTransport({
//     host: process.env.MAIL_HOST,
//     port: 465, // SSL port
//     secure: true, // Use SSL
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS,
//     },
//   });