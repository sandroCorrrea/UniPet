const { Sequelize } = require('sequelize');

// ----------------------------- CONEXÃO COM O BANCO DE DADOS LOCAL
const connectionDatabase = new Sequelize('uni_pet', 'root', 'scrj123456', {
    host:     'localhost',
    dialect:  'mysql',
    timezone: '-03:00',
});
// ----------------------------- FIM DA CONEXÃO COM O BANCO DE DADOS LOCAL

module.exports = connectionDatabase;
