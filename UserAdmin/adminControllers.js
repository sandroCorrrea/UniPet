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
        res.json("Dados salvos com sucesso!");
    }).catch(erro => {
        console.log(erro);
    });
})
module.exports = router;