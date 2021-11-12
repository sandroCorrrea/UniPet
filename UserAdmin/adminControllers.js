const express = require('express');
const router  = express.Router();
const Admin   = require('./Admin');
const bcrypt = require('bcryptjs');

router.get('/admin/user/new', (req, res) => {
    res.render('admin/users/new');
});

router.post('/admin/userAdmin/save' , (req , res)=>{

    var {nameAdmin, cpf, cep, rua, bairro, cidade, uf, sex, dateBirth, profession, acess, passwordAdmin, email, work, status} = req.body;

    var saltPassword  = bcrypt.genSaltSync(10, passwordAdmin);
    var newPassword   = bcrypt.hashSync(passwordAdmin, saltPassword);

    Admin.create({
        nameAdmin: nameAdmin,
        cpf: cpf,
        cep: cep,
        rua: rua,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
        sex: sex, 
        dateBirth: dateBirth,
        profession: profession,
        acess: acess,
        passwordAdmin: newPassword,
        email: email,
        work: work,
        status: status,
    }).then(() => {
        res.redirect('/admin/user/new');
    }).catch(erro => {
        console.log(erro);
    });
});

router.get('/admin/userAdmin/show', (req, res) => {

    Admin.findAll({
        order:[['id', 'DESC']]
    }).then(admins => {
        res.render('admin/users/show', {
            admins: admins,
        }).catch(erro => {
            console.log(erro);
        });
    });
});

router.post('/admin/adminUser/delete', (req, res) => {
    var {id} = req.body;

    if (id != undefined) {
        if (!isNaN(id)) {
            Admin.destroy({
                where:{id: id}
            }).then(() => {
                res.redirect('/admin/userAdmin/show');
            }).catch(erro => {
                console.log(erro);
            });
        }else{
            res.redirect('/admin/userAdmin/show');
        };
    }else{
        res.redirect('/admin/userAdmin/show');
    }
});

router.get('/admin/adminUser/edit/:id', (req, res) => {
    var {id} = req.params;

    if(isNaN(id)){
        res.redirect('/admin/userAdmin/show');
    }else{
        Admin.findOne({
            where: {id: id}
        }).then(admins => {
            if (admins != undefined){
                res.render('admin/users/edit', {
                    admins: admins,
                })
            }else{
                res.redirect('/admin/userAdmin/show');
            }
        }).catch(erro => {
            console.log(erro);
        });
    };
});

router.post('/admin/userAdmin/edit/save', (req, res) => {

    var {nameAdmin, cpf, cep, rua, bairro, cidade, uf, sex, dateBirth, profession, acess, passwordAdmin, email, work, status} = req.body;
    var {id} = req.body;

    var hashPassword = bcrypt.hashSync(passwordAdmin, 10);

    if(!isNaN(id)){
        if (id != undefined) {

            Admin.update({nameAdmin: nameAdmin, cpf: cpf, cep: cep, rua: rua, bairro: bairro, cidade: cidade, uf: uf, sex: sex, dateBirth: dateBirth, profession: profession, acess: acess, passwordAdmin: hashPassword, email: email, work: work, status: status}, {
                where:{id: id}
            }).then(() => {
                res.redirect('/admin/userAdmin/show');
            }).catch(erro => {
                console.log(erro);
            });
        }else{
            res.redirect('/admin/userAdmin/show');
        }
    }else{
        res.redirect('/admin/userAdmin/show');
    }
}); 

module.exports = router;