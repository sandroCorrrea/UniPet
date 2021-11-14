const bcrypt    = require('bcryptjs');
const express   = require('express');
const sequelize = require('sequelize');

class Usuario{

    constructor (){
        this.nome  = " ";
        this.senha = " ";
    }

    ConfirmacaoSenha(senha, senhaConfirmacao){
        if (senha == senhaConfirmacao){
            return true;
        }else{
            return false;
        }
    }
}

module.exports = Usuario;