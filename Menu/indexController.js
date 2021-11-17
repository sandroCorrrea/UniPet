const express  = require('express');
const router   = express.Router();
const User     = require('./Main');
const bcrypt   = require('bcryptjs');
const Usuario  = require('../src/User');
const Pet      = require('../PetRegistro/Pet');

router.get('/', (req, res) => {
    res.render('users/main/index');
});

router.get('/help', (req, res) => {
    res.render('users/main/help');
});

router.get('/login', (req, res) => {
    res.render('users/main/login');
}); 

router.get('/erro1', (req, res) => {
    res.render('users/erros/erroLogin');
});

router.post('/user/register', (req, res) => {
    var usuario = new Usuario();

    var {primaryName, secondaryName, email, cep, rua, bairro, cidade, uf, cpf, password, confirmPassword, sex, dateBirth} = req.body;

    var resultPassword = usuario.ConfirmacaoSenha(password, confirmPassword);

    User.findOne({
        where:{email: email},
    }).then(users => {
        if (users == undefined) {
            if(resultPassword){
                let saltPassword = bcrypt.genSaltSync(10);
                let hashPassword = bcrypt.hashSync(password, saltPassword);
        
                User.create({
                    primaryName:   primaryName,
                    secondaryName: secondaryName,
                    email:         email,
                    cep:           cep,
                    rua:           rua,
                    bairro:        bairro,
                    cidade:        cidade,
                    uf:            uf,
                    cpf:           cpf,
                    password:      hashPassword,
                    sex:           sex,
                    dateBirth:     dateBirth,
                }).then(()=> {
                    res.redirect("/login");
                }).catch(erro => {
                    console.log(erro);
                });
            }else{
                res.redirect('/erro1');
            }
        }else{
            res.redirect('/erro1');
        }
    });
});

router.post('/authentication/login', (req, res) => {
    var {email, password} = req.body;

    User.findOne({
        where: {email: email}
    }).then(users => {
        if (users != undefined) {
            var confirmPassword = bcrypt.compareSync(password, users.password);
            if(confirmPassword){
                req.session.users = {
                    id:            users.id,
                    email:         users.email,
                    primeiroNome:  users.primaryName,
                    segundoNome:   users.secondaryName,
                }
                if(email == "morais.igor4@gmail.com" || email == "alexiafernandes94@gmail.com" || email== "luccavitalc@gmail.com" || email=="jsandro800@gmail.com"){
                    res.redirect('/admin');
                }else{
                    res.redirect('/user/index');    
                }
            }else{
                res.redirect('/erro1');
            }
        }else{
            res.redirect('/erro1');
        }
    }).catch(erro => {
        console.log(erro);
    });
});

router.get('/user/index', (req, res) => {

    var primeiroNome = req.session.users.primeiroNome;
    var capitalized  = primeiroNome[0].toLocaleUpperCase() + primeiroNome.substr(1);

    res.render('users/login/index', {
        nome: capitalized,
    });
}); 

router.get('/user/show', (req, res) => {    
    Pet.findAll({
        order:[['id', 'DESC']]
    }).then(pets => {
        if (pets != undefined) {
            res.render('users/pets/show', {
                pets: pets,
            });
        }else{
            res.redirect('/user/show');
        }
    }).catch(erro => {
        console.log(erro);
    });
});

module.exports = router;