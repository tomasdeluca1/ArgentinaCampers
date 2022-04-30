const controller = {
    index: function(req, res){
        res.render('index')
    },
    productCreation: function(req, res){
        res.render('productCreation')
    }
}



module.exports = controller;