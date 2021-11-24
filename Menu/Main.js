const sequelize = require('sequelize');
const connection= require('../database/database');

const User = connection.define('usuarios', {
    primaryName:{
        type: sequelize.STRING,
        allowNull: false,
    },
    secondaryName:{
        type: sequelize.STRING,
        allowNull: false,
    },
    email:{
        type: sequelize.STRING,
        allowNull: false,
    },
    cep:{
        type: sequelize.STRING,
        allowNull: false,
    },
    rua:{
        type: sequelize.STRING,
        allowNull: false,
    },
    bairro:{
        type: sequelize.STRING,
        allowNull: false,
    },
    cidade:{
        type: sequelize.STRING,
        allowNull: false,
    },
    uf:{
        type: sequelize.STRING,
        allowNull: false,
    },
    cpf:{
        type: sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: sequelize.STRING,
        allowNull: false,
    },
    sex:{
        type: sequelize.BOOLEAN,
        allowNull: false,
    },
    dateBirth:{
        type: sequelize.DATEONLY,
        allowNull: false,
    },
});

// User.sync({force: false});

module.exports = User;