// ------------------------ BIBLIOTECAS USADAS NO PROJETO
const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const sessions   = require('express-session');
// ------------------------------------------------

// ------------------------ CONEXÕES USADAS (BD E ROTAS)
const database        = require('./database/database');
const mainController  = require('./PetRegistro/petRegistroController');
const adminController = require('./UserAdmin/adminControllers');
const postController  = require('./Postagens/postController');
const indexController = require('./Menu/indexController');
// ------------------------------------------------

// ------------------------ CONFIGURAÇÕES DAS BIBLIOTECAS
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(sessions({
    secret: "$2a$10$s72A4RAOwByy/P.PPc1Nd.YLJRfiYXh5ibVsAJ5v24A8TiVTYdXLi",
    cookie: {maxAge: 900000},
}));
// ------------------------------------------------

// ------------------------ AUTENTICAÇÃO COM O BD
database.authenticate()
    .then(() => {
        console.log("Conexao Feita com sucesso!");
    })
    .catch(erro => {
        console.log(erro);
    });
// ------------------------------------------------

// ------------------------ IMPORTANDO ROTAS
app.use('/', mainController);
app.use('/', adminController);
app.use('/', postController);
app.use('/', indexController);
// ------------------------------------------------

const port = process.env.PORT || 8080;

app.listen(port, (erro) => {
    if (erro){
        console.log("ERRO!");
    }
});