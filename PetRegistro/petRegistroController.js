const express   = require('express');
const router    = express.Router();
const Pet       = require('./Pet');
const adminAuth = require('../middlewares/adminAuth');

router.get('/admin', adminAuth, (req , res)=>{
   res.render('admin/pets/index');
});

router.get('/admin/new', adminAuth,(req, res) => {
   res.render('admin/pets/new');
});

router.post('/admin/save' , adminAuth,(req , res)=>{

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

router.get('/admin/show', adminAuth,(req, res) => {

   Pet.findAll({
      order:[['id','DESC']]
   }).then(pets => {
      res.render('admin/pets/show', {
         pets: pets,
      })
   }).catch(erro => {
      console.log(erro);
   });
});

router.post('/admin/delete', adminAuth,(req, res) => {
   var {id} = req.body;

   if (id != undefined){
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
   }else{
      res.redirect('/admin/show');
   }
   
});

router.get('/admin/edit/:id', adminAuth,(req, res) => {
   var {id} = req.params;

   if (isNaN(id)) {
      res.redirect('/admin/show');
   }else{
      Pet.findByPk(id).then(pets => {

         if(pets != undefined){
            res.render('admin/pets/edit', {
               pets: pets,
            });
         }else{
            res.redirect('/admin/show');
         }
      }).catch(erro => {
         console.log(erro);
      });
   }
});

router.post('/admin/save/edit', adminAuth,(req, res) => {

   var {nameFancy, race, colorBody, cityOrigin, height, weight, dateBirth, age, castrated, health, note, sex} = req.body;
   var id = req.body.id;

   if (id != undefined){
      if (!isNaN(id)) {
         Pet.update({nameFancy: nameFancy, race: race, colorBody: colorBody, cityOrigin: cityOrigin, height: height, weight: weight, dateBirth: dateBirth, age: age, castrated: castrated, health: health, note: note, sex: sex}, {
            where: {id: id},
         }).then(() => {
            res.redirect('/admin/show');
         }).catch(erro => {
            console.log(erro);
         });
      }else{
         res.redirect('/admin/show');
      }
   }else{
      res.redirect('/admin/show');
   }
});

module.exports = router;