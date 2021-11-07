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
      res.redirect('/admin/new');
   }).catch(erro => {
      console.log(erro);
   });
});

router.get('/admin/show', (req, res) => {

   Pet.findAll({
      order:[['id','DESC']]
   }).then(pets => {
      res.render('admin/show', {
         pets: pets,
      })
   }).catch(erro => {
      console.log(erro);
   });
});

router.post('/admin/delete', (req, res) => {
   var {id} = req.body;

   if (!isNaN(id)) {

      Pet.destroy({
         where:{id: id}
      }).then(() => {
         res.redirect('/admin/show');
      }).catch(erro => {
         console.log(erro);
      });

   }else{
      res.redirect('/admin/show');
   }

});

module.exports = router;