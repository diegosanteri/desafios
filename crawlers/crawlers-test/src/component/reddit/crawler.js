/*
* Module responsavel pela as operações de obter informações do Reddit
*/

const REDDIT_URL = "https://www.reddit.com"
const Horseman = require("node-horseman")
const async = require("async")
const numeral = require("numeral")


//Intecepta as chamadas e trata a entrada dos dados
function getSubreddits(req, res) {
    if (!req.query.list) {
        return res.status(400).json({
            "message": "Query param list is required"
        })
    }

    getData(req.query.list.split(";"), (texts) => {
        res.json(texts)
    })
}

//Obtem os dados das subreddits
function getData(subreddits, done) {
    var _self = this;
    var values = [];
    var asyncTasks = [];

    if (subreddits) {
        subreddits.forEach((item) => {
            asyncTasks.push(function (cb) {
                extractValues(item, (response) => {
                    cb(null, response)
                })
            });

        })
    }

    async.parallel(asyncTasks, function (err, result) {
        if (err) {
            return done(err)
        }
        done(result)
    })
}


//Extrai os valores do site
function extractValues(subreddit, callback) {

    var horseman = new Horseman();
    const url = REDDIT_URL + "/r/" + subreddit

    horseman
        .open(url)
        .evaluate(function (selector) {
            var data = []
            $(selector).each(function (divIndex, div) {
                var object = {}
                 
                if ($(this).find(".rank").text()) {
                    object.title = $(this).find(".title.may-blank").text()
                    object.upvotes = $(this).find(".score.likes").text()
                    object.commentsUrl = $(this).find(".bylink.comments.may-blank").attr("href")
                    object.postUrl = $(this).find(".title.may-blank.outbound").attr("href")
                    object.rank = $(this).find(".rank").text()
                    object.subreddit = object.commentsUrl.split("/")[4]

                    if (!object.postUrl)
                        object.postUrl = object.commentsUrl
                    data.push(object)
                }
            });

            return data
        }, '#siteTable div')
        .then(function (data) {
            callback(paginateValues(data))
            return horseman.close();
        });
}


//Recupera apenas os dados qeu estão bombando
function paginateValues(data) {
    var newData = []
    data.forEach(function(element) {
        const v = numeral(element.upvotes)
        if(v._value > 5000) {
            element.upvotes = v._value
            newData.push(element)
        }
    });
    return newData
}

module.exports = {
    getSubreddits,
    getData
}