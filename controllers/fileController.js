const File = require("../models/fileModel");
const cloudiary = require("cloudinary");

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.imageFile;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "file is required",
      });
    }

    console.log("file name", file);

    const path =
      __dirname +
      "/files/" +
      `${file.name.split(".")[0]}` +
      Date.now() +
      `.${file.name.split(".")[1]}`;

    file.mv(path, (err) => {
      console.log("error in moving file", err);
    });

    return res.status(200).json({
      success: true,
      message: "local file uploaded successfully.",
    });
  } catch (err) {
    console.log("error in local file upload", err);
    return res.status(500).json({
      success: false,
      message: "Failed to load local file, please try again.",
    });
  }
};

function isFileTypeSupported(type, supportedType) {
  return supportedType.includes(type);
}

async function uploadToCloudinary(file, folder) {
  const options = { folder, resource_type: "video" };
  console.log("temp file path", file.tempFilePath);
  //add resource type to the option to upload video file
  // options.resource_type = "video"
  return await cloudiary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    const { name, email, tags } = req.body;

    console.log(name, email, tags);

    const file = req.files.imageFile;
    console.log("imagefile", file);

    if (!name || !email || !tags) {
      return res.status(400).json({
        success: false,
        message: "all fields are required.check again.",
        data: req.body,
      });
    }

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("fileType", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file type not supported.",
      });
    }

    const response = await uploadToCloudinary(file, "myFolder");
    console.log("clodinary-response", response);

    if (!response) {
      return res.status(500).json({
        success: false,
        message: "failed to upload to clodinary, please try again.",
      });
    }

    const newFile = new File({
        name,
      email,
      tags,
      imageUrl: response.secure_url,
    })

    const savedData = await newFile.save();

    // const savedData = await File.create({
    //   name,
    //   email,
    //   tags,
    //   imageUrl: response.secure_url,
    // });

    if (!savedData) {
      return res.status(500).json({
        success: false,
        message: "failed to save data in database.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "data uploaded successfully",
      imageUrl: response.secure_url,
      data: savedData,
    });
  } catch (err) {
    console.log("err-message", err);
    return res.status(500).json({
      success: false,
      message: "internal server error,please try again.",
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    const { name, email, tags } = req.body;

    const file = req.files.videoFile;

    if (!name || !email || !tags) {
      return res.status(400).json({
        success: false,
        message: "all fields are required.",
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "video file is required.",
      });
    }

    const supportedTypes = ["mp4"];
    const fileType = file.name.split(".")[1].toLowerCase();

    console.log("fileType", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "video type not supported, please send valid type.",
      });
    }

    // sending file to the cloudinary
    const response = await uploadToCloudinary(file, "myFolder");

    console.log("response", response);

    if (!response) {
      return res.status(500).json({
        success: false,
        message: "failed to upload file to the cloudinary, please try again.",
      });
    }

    const savedData = await File.create({
      name,
      email,
      tags,
      imageUrl: response.secure_url,
    });

    if (!savedData) {
      return res.status(500).json({
        success: false,
        message: "failed to save data in database, please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "data successfully saved.",
      imageUrl: response.secure_url,
      data: savedData,
    });
  } catch (err) {
    console.log("err in video uploading", err);
    return res.status(500).json({
      success: false,
      message: "internal server error, please try again later.",
    });
  }
};

exports.imageReducerUpload = async (req, res) => {
    try{

    }catch(err) {

    }
}
