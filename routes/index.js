const express 			= require('express'),
	  db 				= require('../db_connect.js'),
	  bcrypt 			= require('bcrypt'),
	  passport			= require('passport'),
	  LocalStrategy		= require('passport-local').Strategy,
      router 			= express.Router({mergeParams: true});
      
router.use(passport.initialize());
router.use(passport.session());
      
      
    const saltRounds = 10;
    
    passport.use(new LocalStrategy({passReqToCallback: true}, function(req, username, password, done) {
        if(!username || !password ) { 
            return done(null, false); 
        } else {
            let q = 'SELECT * FROM users WHERE username = ?';
            db.query(q, username, function(err, user){
                if (err) { 
                    return done();
                } else if(!user[0].username.length){
                    return done(null, false); 
                } else {
                    let hashed = user[0].password;
                    bcrypt.compare(password, hashed, function(err, res) {
                        if (err){
                            throw err;
                        } else if(res === true){
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                        
                    });
                };
            });
        }
    }));
    
    passport.serializeUser(function(user, done) {
        done(null, user[0].username); 
    });
    
    passport.deserializeUser(function(username, done) {
        db.query('SELECT * FROM users WHERE username = ?;', [username], function(err, user) {
            done(err, user);
        });
    });
    
//Landing Page
router.get('/', function(req, res){
res.render('landing');
});

//log in
router.post('/logmein', passport.authenticate('local', { failureRedirect: '/' }), function(req, res) {
let userID = req.user[0].id;
console.log(req.user.id);
res.redirect('/' + userID + '/rated-items');
});

router.get('/register', function(req, res, next) {
res.render('register');
});

router.post('/register', function(req, res, next){
var firstname = req.body.firstname;
var username = req.body.username;
var useremail = req.body.email;
bcrypt.genSalt(saltRounds, function(err, salt) {	
    if (err) return next(err);
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) return next(err);
        var q = "INSERT INTO users (first_name, username, password, user_email) VALUES ('" + firstname + "', '" + username + "', '" + hash + "', '" + useremail + "')";	
        db.query(q, function(err, results){
            if(err){
                console.log(err);
            } else {
                passport.authenticate('local')(req, res, function(){
                    res.redirect('/' + userID + '/rated-items');
                });
            };
        });
    });
});
});

//Log out
router.get('/logout', function(req, res){
req.logout();
res.redirect('/');
});

module.exports = router;