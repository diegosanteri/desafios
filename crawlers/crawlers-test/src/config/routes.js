/*
    Define as rotas do sistemas
*/

const express = require('express')
const reddit = require("../component/reddit/crawler")
const Bot = require("../component/telegram/bot")
var http = require('http')
var fs = require('fs')


module.exports = function (server) {

    //Inicializa o BOT
    telegramBot = new Bot()


    //Rota para obter os subreddits via API
    const api = express.Router()
    server.use("/api", api)
    api.get('/subreddits/', reddit.getSubreddits)

    //Carrega a pagina inicial para a busca de subreddits
    const view = express.Router()
    server.use("/", view)
    view.get("/", (request, response) => {
        fs.readFile('./src/static/index.html', null, function (error, data) {
            if (error) {
                console.log(error)
                response.writeHead(404);
                response.write('File not found!');
                return
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data);
            }
            response.end();
        });
    })
}

