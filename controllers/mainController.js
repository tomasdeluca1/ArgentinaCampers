const controller = {
    index: function(req, res){
        res.render('index')
    },
    productCreation: function(req, res){     
        res.render('productCreation')
    },
    productEditation: function(req, res){
        res.render('productEditation')
    }
}



module.exports = controller;