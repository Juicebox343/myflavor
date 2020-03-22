const express 			= require('express'),
	  db 				= require('../db_connect.js'),
      router 			= express.Router({mergeParams: true});

//user rated items
router.get('/rated-items', isAuthenticated, function(req, res, next) {
	var userID = req.params.id;
	var q = "SELECT my_groceries.id, my_groceries.brand, my_groceries.item, my_groceries.my_rating, my_groceries.my_comments, my_groceries.favorite from my_groceries WHERE owner_id =" + db.escape(userID);
	db.query(q,function(err, results){
		if(err){
			console.log(err);
		} else {
			var searchResults = results;
			res.render('rated-items', {searchResults: searchResults, userID: userID});
		}
	});	
});

router.get('/settings', isAuthenticated, function(req, res, next){
	let userID = req.params.id;
	let q = "SELECT username, first_name, user_email FROM users WHERE id = " + db.escape(userID);
	db.query(q,function(err, results){
		if(err){
			console.log(err);
		} else {
			let searchResults = results;
			res.render('settings', {searchResults: searchResults, userID: userID});
		}
	});	
})


  //check if authenticated
  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
  }

  module.exports = router;