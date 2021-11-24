const sequelize = require('sequelize');
const database  = require('../database/database');

const Admin = database.define('admins', {

    nameAdmin:{
        type: sequelize.STRING,
        allowNull: false,
    },
    cpf:{
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
    sex:{
        type: sequelize.BOOLEAN,
        allowNull: false,
    },
    dateBirth:{
        type: sequelize.DATEONLY,
        allowNull: false,
    },
    profession:{
        type: sequelize.STRING,
        allowNull: false,
    },
    acess:{
        type: sequelize.STRING,
        allowNull: false,
    },
    passwordAdmin:{
        type: sequelize.STRING,
        allowNull: false,
    },
    email:{
        type: sequelize.STRING,
        allowNull: false,
    },
    work:{
        type: sequelize.STRING,
        allowNull: false,
    },
    status:{
        type: sequelize.BOOLEAN,
        allowNull: false,
    },
});

// Admin.sync({force: false});

module.exports = Admin;