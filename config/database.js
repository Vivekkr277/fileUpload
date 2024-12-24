const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser : true,
        useUnifiedTopology  :true
    }).then(() => {console.log("database connected successfully")})
    .catch((err) => {
        console.log("error in connection with database",err)
    })
}