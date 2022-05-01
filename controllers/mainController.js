const controller = {
    index: function(req, res){
        res.render('index')
    },
    productDetail: function(req, res){
        res.render('productDetail')
    },
    productCart: function(req, res){
        res.render('productCart')
    },
    login: function(req, res){
        res.render('login')
    },
    register: function(req, res){
        res.render('register')
    },
}



module.exports = controller;