const sequelize = require('sequelize');
const database  = require('../database/database');

const Pet = database.define('pets', {
    nameFancy:{
        type: sequelize.STRING,
        allowNull: false,
    },
    race:{
        type: sequelize.STRING,
        allowNull: false,
    },
    colorBody:{
        type: sequelize.STRING,
        allowNull: false,
    },
    cityOrigin:{
        type: sequelize.STRING,
        allowNull: false,
    },
    height:{
        type: sequelize.FLOAT,
        allowNull: false,
    },
    weight:{
        type: sequelize.FLOAT,
        allowNull: false,
    },
    dateBirth:{
        type: sequelize.DATEONLY,
        allowNull: false,
    },
    age:{
        type: sequelize.INTEGER,
        allowNull: false,
    },
    castrated:{
        type: sequelize.BOOLEAN,
        allowNull: false,
    },
    health:{
        type: sequelize.BOOLEAN,
        allowNull: false,
    },
    sex:{
        type: sequelize.BOOLEAN,
        allowNull: false,
    },
    note:{
        type: sequelize.TEXT,
        allowNull: false,
    },
});

// Pet.sync({force: true});

module.exports = Pet;