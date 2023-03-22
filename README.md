# Gerenciador de ambientes
A API fornece um serviço para gerenciamento de ambientes de lazer. É possível cadastrar os ambientes e os itens pertencentes a ele, assim como adicionar fotos de cada coisa. Também é possível gerenciar as pessoas para quem você aluga rotineiramente e fazer os alugueis.

# Instalação (Windows)
+ Node.js
> Acessar a página do [Node.js](https://nodejs.org/pt-br), fazer o download da ferramenta e seguir as orientações padrão do instalador.
+ Yarn
>  Acessar a página do [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable). Ao abrir a página, clicar no toggle `Click to expand / collapse`, escolher o windows como plataforma e clicar no botão de download. Após isso, executar o instalador e seguir as orientações padrão do instalador.
+ PostgreSQL
> Acessar a página do [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) e depois clique na opção de instalador do postgres 14 ou 15. Após o download, executar o instalador e seguir as orientações padrão.
+ Após instalação das ferramentas, colocar o projeto e rodar os seguintes comandos:
> `yarn install`
> `yarn prisma migrate dev`
