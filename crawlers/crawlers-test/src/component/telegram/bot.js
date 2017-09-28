/*
* Bot para receber os dados do Telegram
*/

const token = '345827316:AAEJ-wLQBlLDWpN0MhnL0-mrj_Q8RToF7X8';
const TelegramBot = require('node-telegram-bot-api');
const crawler = require("../reddit/crawler")

class BootTelegram {
    
    constructor(){
        this.getReddits = this.getReddits.bind(this)
        this.bot = new TelegramBot(token, {polling: true})
        this.commands()
    }

    commands(){
        this.bot.onText(/\/NadaPraFazer (.+)/, this.getReddits)
    }

    getReddits(msg, match) {
        const chatId = msg.chat.id;

        const subreddits  = match[1] ? match[1].split(";") : undefined
        if (!subreddits) {
            return this.bot.sendMessage(chatId, "Query param list is required");
        }

        this.bot.sendMessage(chatId, "Aguenta ai já te mostro");
        crawler.getData(subreddits, (response)=>{            
            this.bot.sendMessage(chatId, this.formatResponse(response));
        })
    }

    formatResponse(subreddits){
        var message = ""
        subreddits.forEach((subreddit) => {
            subreddit.forEach((thread) =>{
                console.log(thread)
                message += "=============================\n"

                message += `Ranking: ${thread.rank}\n`
                message += `Title: ${thread.title}\n`
                message += `Upvotes: ${thread.upvotes}\n`
                message += `Comments URL: ${thread.commentsUrl}\n`
                message += `Post URL: ${thread.postUrl}\n`
                message += `subreddit: ${thread.subreddit}\n`
            })
        })


        message += "=============================\n"
        return message
    }

}

module.exports = BootTelegram