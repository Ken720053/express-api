const express = require("express");
const router = express.Router();


const validateUser = (user) =>{
    return true;
};

const authenticator = (req,res,next) =>{
    if(validateUser(req.user)) {
        next();
    }else {
        res.redirect("/");
    }
};
//設定根路由
router.get("/",(req,res) =>{
    res.render("home");
    // res.send("Hello Wolrd!!");
});

router.get("/about" , (req,res) =>{
    res.render("about");
});

//使用 articles router
router.use("/articles", authenticator , require("./articles"));

//使用 auth router
router.use("/auth" , require("./auth"));

//使用 file router
router.use("/file" , require("./file"));

//用 api router
router.use("/api" , require("./api"));


router.get("/*" , (req,res) =>{
    res.send("Not found")
})

module.exports = router;