const sequelize = require('sequelize');
const connection= require('../database/database');

const Post = connection.define('postagens', {
    title:{
        type: sequelize.STRING,
        allowNull: false,
    },
    body:{
        type: sequelize.TEXT,
        allowNull: false,
    },
});

Post.sync({force: false});

module.exports = Post;