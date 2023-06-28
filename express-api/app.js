const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const fs = require("fs");
const bodyParser = require("body-parser");

//設定樣板引擎
app.engine("handlebars" , exphbs.engine());
app.set("view engine", "handlebars");

// parse req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
const logger = (req,res ,next) =>{
    const datetime = new Date();
    const timeStamp = datetime.toString() + "  " +req.originalUrl + "\n";
    console.log("timeStamp" , timeStamp);


    //簡潔寫法
    // fs.wrireFile( path.join(__dirname , "./log/log.txt") , timeStamp, {flag: "a+"}, (err) =>{
    //     if(err) console.log(err);
    //     next();
    //     }
    // );
    //先讀取檔案，再寫入檔案
    fs.readFile(path.join(__dirname , "./log/log.txt") ,
    (err , data) =>{
        if(err) console.log(err);

        const newData = data ? data.toString() + "\n" + timeStamp : timeStamp;
        //寫入 log.txt
        fs.writeFile(path.join(__dirname , "./log/log.txt") , newData , (err) =>{
            if (err) console.log(err);
            next();
        });
    });
}
//errorHandler
const errorHandler = (err,req,res,next) =>{
    console.log("err" ,err);
    console.log(err.name , ":" ,err.message);
    if(err)
        res.status(500).send(`<h1> there is an error: ${err.message}</h1>`);
};

//使用logger
app.use(logger);
//Express提供靜態檔案 Public folder
app.use("/static" , express.static("public")); 

app.use("/" , require("./route"));

//使用errorHandler
app.use(errorHandler);
app.listen(3000 , () =>{
    console.log("express app listen on port 4000");
});