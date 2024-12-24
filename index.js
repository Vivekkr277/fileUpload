const express = require("express");
require("dotenv").config();
const fileUpload = require("express-fileupload")
const router = require("./routes/route")
const cloudinary = require("./config/cloudinary");
const {dbConnect} = require("./config/database")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use("/api/upload", router);

//connnecting to the cloudinary web
cloudinary.cloudinaryConnect();
dbConnect();

console.log("running",port)

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

