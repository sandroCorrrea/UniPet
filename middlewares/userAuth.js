var userAuth = (req, res, next) =>{
    if (req.session.users != undefined){
        next();
    }else{
        res.redirect('/login');
    }
}

module.exports = userAuth;