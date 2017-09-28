/*
    Eu criarei aqui duas funções uma pro teste basico e um pro intermediario. Não sei se 
    entendi direito, mas eu criei uma função pra cada uma dos niveis do desafio. Aqui na verdade
    eu gostaria mesmo de fazer uma função mais generica, mas fiquei meio confuso com o enunciado.
*/


function formatTextBasic(text, rowSize){
    var output = ""
    const index = 0

    //Params validation
    if(!/^-?[\d.]+(?:e-?\d+)?$/.test(rowSize)) {
        throw "Row size must be a numeric"
    }

    if (!text) {
        throw "Text is empty"
    }

    //Get text paragraphs
    const paragraphs = text.split("\n")
    for (var i=0; i<paragraphs.length; i++) {
        //Get words
        var words = paragraphs[i].replace(/\n/g,"").split(/(\S+\s+)/)

        while(words.length > 0) {
            var row = ""
            while(true) {
                //Check if current row + next word is bigger than max row size
                if (row.length + words[index].length - 1> rowSize) {
                    row =  row.trim() + "\n"
                    break;
                } else {
                    //Remove current word from queue ang get value
                    const removedWord = words.splice(index, 1)[0]                            
                    if ((row.length + removedWord.length == rowSize) ||  (index + 1 > words.length)) {
                        row += removedWord + "\n"
                        break;           
                    } else {
                        row += removedWord
                    }            
                }
            }
            output += row
        }
    }

    return output.trim()
}

function formatTextIntermediary(text, rowSize) {
    var output = ""
    const index = 0

    //Params validation
    if(!/^-?[\d.]+(?:e-?\d+)?$/.test(rowSize)) {
        throw "Row size must be a numeric"
    }

    if (!text) {
        throw "Text is empty"
    }

    //Get text paragraphs
    const paragraphs = text.split("\n")
    for (var i=0; i<paragraphs.length; i++) {
        var words = paragraphs[i].replace(/\n/g,"").split(/(\S+\s+)/)

        while(words.length > 0) {
            var row = ""
            while(true) {
                //Check if current row + next word is bigger than max row size
                if (row.length + words[index].length - 1 > rowSize) {                    
                    row = row.trim() + "\n"
                    break;
                } else {
                    //Remove current word from queue ang get value
                    const removedWord = words.splice(index, 1)[0]                            
                    if ((row.length + removedWord.length == rowSize) ||  (index + 1 > words.length)) {
                        row += removedWord.trim() + "\n"
                        break;           
                    } else {
                        row += removedWord
                    }            
                }
            }
            
            //Check current row is greater or equals than max row size
            if(row.length - 1 < rowSize && row.length > 1) {
                var c = 0
                row = row.trim()
                var rowWords = row.replace(/\n/g," ").split(" ")

                row = ""
                
               // Keep in the loop while row is less than max row size
               // Each interation put space between words
               do{
                    if(c + 1 > rowWords.length - 1) {
                        c = 0
                    }

                    if(rowWords[c].endsWith(",")  || rowWords[c].endsWith(";") || 
                        rowWords[c].endsWith(".") || rowWords[c].endsWith("!")) {
                        rowWords[c] += "  "
                    } else {
                        rowWords[c] += " "
                    }
                    
                    row = rowWords.join("")
                    c++
               } while(row.length < rowSize)
            
                row = row + "\n"
            }
            
            output += row 
        }
    }

    return output.trim()
}

module.exports = {
    formatTextBasic,
    formatTextIntermediary
}