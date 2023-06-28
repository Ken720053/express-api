const express = require("express");
const router = express.Router();
// const articles = require("../seed/article");
const path = require("path");
const fs = require("fs");

// articles,json file path
const articleFilePath = path.join(__dirname , "../data/articles/articles.json");
//文章列表
router.get("/" , (req,res) => {
    fs.readFile(articleFilePath , (err,data) =>{
        if(err) console.log(err);

        const articles = JSON.parse(data.toString());

        //使用樣板
        res.render("articles" , {articles:articles});
    })
    
});

//單篇文章
router.get("/:id" , (req,res) =>{
    const id = req.params.id;
    fs.readFile(articleFilePath , (err,data) =>{
        if(err) console.log(err);

        const articles = JSON.parse(data.toString());

        //使用樣板
        res.render("article" , {
            articles: [articles[id]],
            backUrl: "/articles",//回到上一頁
            editUrl: `/articles/${id}/edit`,//編輯文章頁面
            deleteMethod:"delete",//刪除文章的Method
            deleteUrl: `/api/articles/${id}`,//刪除文章的URL
            js:["article.js"] //載入js file
        });
    })

});

module.exports = router;