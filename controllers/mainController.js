const controller = {
    index: function(req, res){
        res.render('index')
    },
    productCreation: function(req, res){     
        res.render('productCreation')
    },
    productEdit: function(req, res){
        res.render('productEdit')
    }
}



module.exports = controller;