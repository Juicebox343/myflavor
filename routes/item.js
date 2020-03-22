const express 			= require('express'),
	  db 				= require('../db_connect.js'),
      router 			= express.Router({mergeParams: true});


//add items form
router.get('/new-item', isAuthenticated, function(req, res){
	let userID = req.params.id;
	res.render('new-item', {userID: userID});
});

//add items
router.post('/new-item', isAuthenticated, function(req, res){
	let userID = req.params.id;
	var itemName = req.body.item;
	var brandName = req.body.brand;
	let setRating = req.body.itemRating;
	let isFav = req.body.favButton;
	let ratingComment = req.body.itemComment;
	
	if (setRating === null){
		setRating = "NULL"
	}
	if (ratingComment === null){
		ratingComment = "NULL";
	}
	if (isFav){
		isFav = 1;
	} else {
		isFav = 0;
	}

	var q = "INSERT INTO my_groceries (item, brand, my_rating, my_comments, favorite, owner_id) VALUES (" + db.escape(itemName) + ", " + db.escape(brandName) + ", " + db.escape(setRating) + ", " + db.escape(ratingComment) + ", " + db.escape(isFav) + ", " + userID + ")";	
	db.query(q, function(err, results){
		if(err){
			console.log(err);
		} else {
				res.redirect('/' + userID + '/rated-items');
		};
	});
})

//show page of item
router.get('/:itemID', isAuthenticated, function(req, res, next){
    let itemID = req.params.itemID;
    let userID = req.params.id;	
    console.log(userID)
    let q = "SELECT my_groceries.id, my_groceries.brand, my_groceries.item, my_groceries.my_rating, my_groceries.my_comments, my_groceries.favorite from my_groceries WHERE (id = " + itemID + " AND owner_id =" + userID + ")";
    db.query(q,function(err, results){
        if(err){
            console.log(err);
        } else {
            var searchResults = results;
            res.render('show', {searchResults: searchResults, userID: userID});
        }
    });
});

//change rating of item in pantry
router.put('/:itemID', isAuthenticated, function(req, res){ 
	let itemID = req.params.itemID;
	var userID = req.params.id;	
	let changeRatingTo = req.body.itemRating;
	let isFav = req.body.favButton;
	let ratingComment = req.body.itemComment;
	let q ="";
	if (changeRatingTo === null){
		changeRatingTo = "NULL"
	}
	if (ratingComment === null){
		ratingComment = "NULL";
	}
	if (isFav){
		isFav = 1;
	} else {
		isFav = 0;
	}
	q = `UPDATE my_groceries SET my_rating = ${db.escape(changeRatingTo)} , favorite = ${db.escape(isFav)}, my_comments = ${db.escape(ratingComment)} WHERE my_groceries.id = ${db.escape(itemID)}`;
	db.query(q, function(err, results){
		if(err){
			console.log(err);
		} else {
			res.redirect('/'+ userID +'/rated-items');
		}		
	});	
})


//delete item from rated items
router.delete('/:itemID', isAuthenticated, function(req, res){
	let itemID = req.params.itemID;
	var userID = req.params.id;	
	var q = "DELETE FROM my_groceries WHERE (id = " + itemID + " AND owner_id =" + userID + ")";
	db.query(q,function(err){
		if(err){
			console.log(err);
		} else {
			res.redirect('/'+ userID +'/rated-items');
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