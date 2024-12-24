const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const transporter = require("../config/emailConfig")
require("dotenv").config();

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  tags: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

//post or pre middleware should be written before model and after schema means before the compileation of the model

fileSchema.pre("save", function (next) {
  console.log("pre middleware executed.");
  next();
});

fileSchema.post("save", async function (doc) {
  // console.log('post-doc', doc)

  

  const info = await transporter.sendMail({
    from: "Vivek kumar",
    to: doc.email,
    subject: "New file uploaded on cloudinary.",
    text: "helo user , you have done! ",
    html: `<h2>Your file has been successfully uploaded.</h2>
            <p>View here : <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
  });

  console.log("info of maiil", info);
});

module.exports = mongoose.model("File", fileSchema);
