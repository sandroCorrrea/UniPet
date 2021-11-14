const { Sequelize } = require('sequelize');

/* ----------------------------- CONEXÃO COM O BANCO DE DADOS LOCAL */
// const connectionDatabase = new Sequelize('uni_pet', 'root', 'scrj123456', {
//     host:     'localhost',
//     dialect:  'mysql',
//     timezone: '-03:00',
// });
/* ----------------------------- FIM DA CONEXÃO COM O BANCO DE DADOS LOCAL */


/* ----------------------------- CONEXÃO COM O BANCO DE DADOS OFICIAL */
const connectionDatabase = new Sequelize('heroku_7de64fc170be64d', 'b90cf9b89176af', 'a7f5926a', {
    host:     'us-cdbr-east-04.cleardb.com',
    dialect:  'mysql',
    timezone: '-03:00',
});
/* ----------------------------- FIM DA CONEXÃO COM O BANCO DE DADOS OFICIAL */

module.exports = connectionDatabase;