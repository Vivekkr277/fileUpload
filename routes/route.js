const express = require("express")
const {localFileUpload, imageUpload, videoUpload} = require("../controllers/fileController")

const router = express.Router();

router.post("/localFileUpload", localFileUpload );
router.post('/imageUpload', imageUpload);
router.post("/videoUpload",videoUpload);

module.exports = router