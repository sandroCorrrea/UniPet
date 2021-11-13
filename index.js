// ------------------------ BIBLIOTECAS USADAS NO PROJETO
const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
// ------------------------------------------------

// ------------------------ CONEXÕES USADAS (BD E ROTAS)
const database       = require('./database/database');
const mainController = require('./PetRegistro/petRegistroController');
const adminController= require('./UserAdmin/adminControllers');
const postController = require('./Postagens/postController');
// ------------------------------------------------

// ------------------------ CONFIGURAÇÕES DAS BIBLIOTECAS
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
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
// ------------------------------------------------


app.listen(4000, (erro) => {
    if (erro){
        console.log("ERRO!");
    }
});