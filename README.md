# Gerenciador de ambientes
A API fornece um serviço para gerenciamento de ambientes de lazer. É possível cadastrar os ambientes e os itens pertencentes a ele, assim como adicionar fotos de cada coisa. Também é possível gerenciar as pessoas para quem você aluga rotineiramente e fazer os alugueis.

# Instalação (Windows)
+ Node.js
> Acessar a página do [Node.js](https://nodejs.org/pt-br), fazer o download da ferramenta e seguir as orientações padrão do instalador.
+ Yarn
>  Acessar a página do [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable). Ao abrir a página, clicar no toggle `Click to expand / collapse`, escolher o windows como plataforma e clicar no botão de download. Após isso, executar o instalador e seguir as orientações padrão do instalador.
+ PostgreSQL
> Acessar a página do [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) e depois clique na opção de instalador do postgres 14 ou 15. Após o download, executar o instalador e seguir as orientações padrão.
+ Após instalação das ferramentas, clonar o projeto e rodar os seguintes comandos:
> `yarn install`
> `yarn prisma migrate dev`
## Arquivos na API
+ Prisma
> É necessáro criar um arquivo `.env` na raiz do projeto, esse sendo uma cópia do outro arquivo `.env.example`, e seguir as orientações nele descritas.
+ Firebase
> Já com o seu projeto criado no firebase, vá na `engrenagem(configurações)->Configurações do projeto->Contas de serviço->Gerar uma nova chave privada`. Será feito um download de um json, e esse será colocado na pasta `./src/config/firebase.json`.

## Email
+ Nodemailer
> Para utilizar o nodemailer, é necessário criar uma chave de autenticação com um email válido (seguir as orientações do gmail para tal). Com essa chave gerada, adicionar ela no arquivo `.env` que vc duplicará do arquivo `env.example`, na chave `EMAIL_PASSWORD`, assim como seu email na chave `EMAIl`. É importante também gerar um hash diferente para o `JWT_PASS_EMAIL`, comparado com o `JWT_PASS`.

# Swagger
Para colocar o servidor de pé, rodar o comando `yarn dev` no terminal. Após o servidor ligados, acessar a rota `localhost:3333/documentation`
