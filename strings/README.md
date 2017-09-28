# Desafio 1: String
Para um maior entendimento pode-se importar o postman contido na raiz desse projeto, chamado de ID-WALL.postman_collection.

O Projeto está utilizando docker, para roda-lo é necessario gerar uma imagem, para isso rode o seguinte comando: 
    - --Criar imagem - docker build -t "string-test" .
    - --Criar Container - docker run -d -p 3001:3001 --name string-test string-test .
    - --Rodar projeto - docker start string-test .

Basta realizar as chamadas realiadas no postman e obter os valores desejados.


### Parte 1
Para formatar o texto de forma basica basta passar o seguinte comando:
    http://localhost:3001/results?type=basic&rowSize=40
Existem outros dois arquivos, para acessa-los basta chamar:
    http://localhost:3001/results?test=text_2&type=basic&rowSize=40
    http://localhost:3001/results?test=text_3&type=basic&rowSize=40


### Parte 2
Para formatar o texto de forma justificada basta passar o seguinte comando:
    http://localhost:3001/results?type=intermediary&rowSize=40
Existem outros dois arquivos, para acessa-los basta chamar:
    http://localhost:3001/results?test=text_2&type=intermediary&rowSize=40
    http://localhost:3001/results?test=text_3&type=intermediary&rowSize=40


