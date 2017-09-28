/*
    Define as rotas do sistemas
*/

const express = require('express')
const fs = require('fs')
const strings = require ("../component/strings")

module.exports = function (server) {
    const router = express.Router()

    server.use("/", router)
    router.get('/results',  (req, res)=>{
        var response = ""

        //Parametros vindos por query param
        const rowSize = req.query.rowSize || 40; //Tamanho das linhas
        const type = req.query.type || "basic"   //Tipo do teste
        const test = req.query.test || "test_1"  //Nome do arquivo com texto a ser testado

        //realiza o carregamento do arquivo com o texto
        fs.readFile(`./texts/${test}`, 'utf8', function (err,data) {
            if (err) {
                return res.status(400).json({
                    message: "Test not found"
                })
            }
            
            switch (type){
                case "basic" : {
                    try {
                        response = strings.formatTextBasic(data, parseInt(rowSize))
                    } catch(e) {
                        return res.status(400).send(e)
                    }
                    break
                }
                case "intermediary": {
                     try {
                        response = strings.formatTextIntermediary(data, rowSize)
                    } catch(e) {
                        return res.status(400).send(e)
                    }
                    break;
                }
                default :{
                    return res.status(400).json({
                        message: "Invalid operation"
                    })
                }
            }
            res.send(response)
        });        
        
    })
}

