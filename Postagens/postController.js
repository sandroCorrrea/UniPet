const express   = require('express');
const router    = express.Router();
const Post      = require('./Post');
const adminAuth = require('../middlewares/adminAuth');

router.get('/admin/new/post', adminAuth,(req, res) => {
    res.render('admin/post/new');
});

router.post('/admin/save/post' , adminAuth,(req , res)=>{
    var {title, body} = req.body;

    Post.create({
        title: title,
        body:  body,
    }).then(() => {
        res.redirect('/admin/new/post');
    }).catch(erro => {
        console.log(erro);
    });
});

router.get('/admin/show/post', adminAuth,(req, res) => {
    Post.findAll({
        order:[['id', 'DESC']]
    }).then(posts => {
        if (posts != undefined){
            res.render('admin/post/show', {
                posts: posts,
            });
        }else{
            res.redirect('/admin/show/post');
        }
    }).catch(erro => {
        console.log(erro);
    });
});

router.post('/admin/delete/post', adminAuth,(req, res) => {
    var {id} = req.body;

    if (!isNaN(id)) {
        if (id != undefined) {
            Post.destroy({
                where:{id: id}
            }).then(() => {
                res.redirect('/admin/show/post');
            }).catch(erro => {
                console.log(erro);
            });
        }else{
            res.redirect('/admin/show/post');
        }
    }else{
        res.redirect('/admin/show/post');
    }
}); 

router.get('/admin/post/edit/:id', adminAuth, (req, res) => {
    var {id} = req.params;

    if (isNaN(id)){
        res.redirect('/admin/show/post');
    }else{
        Post.findOne({
            where:{id: id},
        }).then(posts => {
            if (posts != undefined){
                res.render('admin/post/edit', {
                    posts: posts
                });
            }else{
                res.redirect('/admin/show/post');
            }
        }).catch(erro => {
            console.log(erro);
        });
    }
}); 

router.post('/admin/edit/post', adminAuth,(req, res) => {
    var {title, body} = req.body;
    var id = req.body.id;

    if (id != undefined){
        if (!isNaN(id)){
            Post.update({title: title, body: body}, {
                where:{id: id}
            }).then(() => {
                res.redirect('/admin/show/post');
            }).catch(erro => {
                console.log(erro);
            })
        }else{
            res.redirect('/admin/show/post');
        }
    }else{
        res.redirect('/admin/show/post');
    }
});

module.exports = router;