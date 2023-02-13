# Filmes

Aplicação web que consome a API do The Movie DB.

Link deploy: https://api-filmes-1c278.web.app

### Objetivo
Criar uma aplicação de filmes personalizável, onde o usuário pode se cadastrar e fazer login, salvar filmes, avaliar, favoritar e fazer pesquisas.

### Descrição
Para acessar a aplicação, o usuário deve se cadastrar e fazer login ou fazer a autenticação pelo Google, devido ao guard de autenticação não será possível acessar sem se autenticar. Quando é feita a autenticação se for o primeiro login do usuário ele será salvo no banco de dados.

Foram feitas diversas requisições para a API do The Movie DB para obter as listas de filmes e suas informações completas.

Todas as páginas possuem uma navBar que exibe o nome do usuário logado e um avatar padrão que pode ser alterado. Também possui um input para pesquisar filmes pelo nome e as listas de favoritos e salvos para assistir depois do usuário. A página inicial renderiza listas de lançamentos, filmes com melhores avaliações e filmes mais populares. Possui uma aba de Gêneros que faz uma filtragem nos filmes pelo gênero que foi selecionado. Caso o usuário queira visualizar mais informações de um filme, é possível clicar no poster e será redirecionado para uma página com informações completas do filme desejado. Todos os cards dos filmes possuem botão de favoritar e salvar, as listas podem ser visualizadas clicando nos botões correspondentes na navbar. Caso o usuário queira, pode remover um filme salvo clicando no ícone de lixeira e também pode fazer sua própria avaliação do filme clicando na estrela azul. Na lista de assistir depois, há um botão de assistido que salva esse filme em outra lista, caso o usuário queira ver seu histórico de filmes assistidos.

### Tecnologias
- Angular (front-end);
- Firebase (back-end).

### Imagens
![APP Filmes](https://user-images.githubusercontent.com/99519903/218520369-6ead5e33-b13d-46e1-83e4-0ced73fad3bd.png)




