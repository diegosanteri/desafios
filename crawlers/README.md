# Desafio 2: Crawlers
Para um maior entendimento pode-se importar o postman contido na raiz desse projeto, chamado de ID-WALL.postman_collection.

O Projeto está utilizando docker, para roda-lo é necessario gerar uma imagem, para isso rode o seguinte comando: 
    - --Criar imagem - docker build -t "crawler-test" .
    - --Criar Container - docker run -d -p 3002:3002 --name crawler-test crawler-test
    - --Rodar projeto - docker start crawler-test .
    - --Acess agora - localhost:3002


### Parte 1
Acesse agora localhost:3002, a pagina será aberta. Basta digitar no text input as subreddits necessarias e clicar no botão search. Aguarde um pouco e os resultados serão exibidos em uma lista.

### Parte 2
Encontre o Bot @idredditbot, basta passar pra ele o comando ex: /NadaPraFazer cats;askreddit
Aguarde um pouco e al ista será exibida