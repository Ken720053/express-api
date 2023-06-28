const express = require("express");
const router = express.Router();

//Express提供靜態檔案 path絕對路徑
router.get("/txt" , (req,res) =>{
    const absPath = path.join(__dirname, "/file/text.txt");
    res.sendFile(absPath , (err) =>{
        console.log("err");
    });
});

//靜態html
router.get("/getHtml" , (req,res) =>{
    const absPath = path.join(__dirname , "/html/test.html");
    res.sendFile(absPath , (err) => {
        console.log(err);
    });
});
//靜態image
router.get("/getimages" , (req,res) =>{
    const absPath = path.join(__dirname , "/images/banner.jpg");
    res.sendFile(absPath , (err) => {
        console.log(err);
    });
});

module.exports = router;