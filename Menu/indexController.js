const express  = require('express');
const router   = express.Router();
const User     = require('./Main');
const bcrypt   = require('bcryptjs');
const Usuario  = require('../src/User');
const Pet      = require('../PetRegistro/Pet');
const Admin    = require('../UserAdmin/Admin');
const userAuth = require('../middlewares/userAuth');
const Post    = require('../Postagens/Post');

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

    Admin.findOne({
        where: {email: email}
    }).then(admins => {
        if (admins != undefined){
            var compPassword = bcrypt.compareSync(password, admins.passwordAdmin);
            if (compPassword) {
                req.session.admins = {
                    id  : admins.id,
                    name: admins.nameAdmin,
                    email: admins.email,
                }
                res.redirect('/admin');
            }else{
                res.redirect("/erro1");
            }
        }else{
            User.findOne({
                where:{email: email}
            }).then(users => {
                if (users != undefined) {
                    var compPasswordUser = bcrypt.compareSync(password, users.password);
                    if(compPasswordUser){
                        req.session.users = {
                            id: users.id,
                            name: users.primaryName,
                            email: users.email,
                        }
                        res.redirect('/user/index');
                    }else{
                        // ERROU A SENHA
                        res.redirect('/erro1');
                    }
                }else{
                    // NÃO POSSUI CADASTRO
                    res.redirect('/erro1');
                }
            }).catch(erro => {
                console.log(erro);
            })
        }
    }).catch(erro => {
        console.log(erro);
    });
});

router.get('/user/index', userAuth, (req, res) => {

    var primeiroNome = req.session.users.name;
    var capitalized  = primeiroNome[0].toLocaleUpperCase() + primeiroNome.substr(1);

    res.render('users/login/index', {
        capitalized: capitalized,
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

router.get('/post', (req, res) => {

    Post.findAll().then(posts => {
        if (posts != undefined) {
            res.render('users/main/posts', {
                posts: posts,
            });
        }else{
            res.redirect('/');
        }
    }).catch(erro => {
        console.log(erro);
    });
});

router.get('/adocao/pet', (req, res) => {
    res.render('users/pets/contract');
});

module.exports = router;