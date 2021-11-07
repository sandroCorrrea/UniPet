const express = require('express');
const router  = express.Router();
const Pet     = require('./Pet');

router.get('/admin' , (req , res)=>{
   res.render('admin/index');
});

router.get('/admin/new', (req, res) => {
   res.render('admin/new');
});

router.post('/admin/save' , (req , res)=>{

   var {nameFancy, race, colorBody, cityOrigin, height, weight, dateBirth, age, castrated, health, note, sex} = req.body;

   Pet.create({
      nameFancy : nameFancy,
      race      : race,
      colorBody : colorBody,
      cityOrigin: cityOrigin,
      height    : height,
      weight    : weight,
      dateBirth : dateBirth,
      age       : age,
      castrated : castrated,
      health    : health,
      sex       : sex,
      note      : note,
   }).then(() => {
      res.json("Dados criados com sucesso!");
   }).catch(erro => {
      console.log(erro);
   });
});



module.exports = router;