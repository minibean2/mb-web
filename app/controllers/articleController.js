/*Crated By Vinod
 Date-20-03-2017
 Article Controller
 */

var articles = require("../models/articleModel");

module.exports = function (app) {

    /*Created By Vinod
     Get articles
     */
    app.get("/api/articles", function (req, res) {
        var start = parseInt(req.param('start'));
        var limit = parseInt(req.param('limit'));
        articles.find({}, null, {
            skip: start,
            limit: limit,
            sort: {
                post_date: -1
            }
        }, function (err, results) {
            if (err) {
                res.status(500).send(err);
            }
            var data = {
                statusCode: "200",
                res: results,
                message: "Articles"
            }
            res.send(data);
        });
    })

    /*Created By Vinod
     Get article by id
     */
    app.get("/api/article", function (req, res) {
        articles.findById(req.param('articleId'), function (err, result) {
            if (err) {
                res.status(500).send(err);
            }
            var data = {
                statusCode: "200",
                res: result,
                message: "Article"
            }

            res.send(data);
        });
    });

    /*Created By Vinod
     Save article
     */
    app.post("/api/article/save", function (req, res) {
        var article = req.body;

        if (article.post_date == undefined || article.post_date == '') {
            article.post_date = new Date();
        }

        articles.create(article, function (err, result) {
            if (err) {
                res.status(500).send(err);
            }
            var data = {
                statusCode: "200",
                res: result,
                message: "Article"
            }

            res.send(data);
        });
    });

    /*Created By Vinod
     Get article by category id
     */
    app.get("/api/article/category/:categoryId", function (req, res) {
        var categoryId = req.params.categoryId;

        articles.find({ "category.id": categoryId }, function (err, results) {
            if (err) {
                res.status(500).send(err);
            }
            var data = {
                statusCode: "200",
                res: results,
                message: "Article by category id"
            }
            res.send(data);
        });
    });

    /*Created By Vinod
     Delete article by id
     */
    app.get("/api/article/delete/:articleId", function (req, res) {
        var articleId = req.params.articleId;

        articles.remove({ "_id": articleId }, function (err, result) {
            if (err) {
                res.status(500).send(err);
            }
            var data = {
                statusCode: "200",
                res: result,
                message: "delete article"
            }
            res.send(data);
        });

    });

    /*Created by Vinod
      Update featured
    */
    app.post("/api/update/featured", function (req, res) {
      
       var obj = req.body;
       var article = obj.articles;
       articles.update({}, {featured:false}, { multi: true },
            function(err, num) {
                if(article.length == 0){
                    res.send("no record to update");
                }
                var count = article.length;
                var length = 0;

                for(var i=0;i<article.length;i++){
                    length++;
                    articles.update({"_id":article[i]}, {featured:true},
                        function(err, num) {
        
                    });
                }

                res.send("update record...");
            });
    });

}
