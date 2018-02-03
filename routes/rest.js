const express = require('express');
const router = express.Router();
const user = require('../models/user');


var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

  let FacebookStrategy = require('passport-facebook').Strategy;


  passport.use(new LocalStrategy({

  	usernameField: 'email',
    passwordField: 'passwd'

	}, function(username, password, done) {
		console.log("Paass")
    user.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'No User Found' });
      }
      if (user.password != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

  passport.use(new FacebookStrategy({
    clientID: 174621106488036,
    clientSecret: "3d1327c57d6d7759dbfdc7b350617d88",
    callbackURL: "http://localhost:8080/rest/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    user.findOrCreate(profile, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));




 passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  user.findById(id, function(err, user) {
    done(err, user);
  });
});



router.get('/', (req, res)=>{
    res.send("Welcome to Dashboard")
})
    
router.get('/registration', (req, res)=>{
    res.render('register')
})

router.get('/login', (req, res)=>{
    res.render('login')
})

router.get('/user', (req, res)=>{
	res.render('update');
})

router.post('/update', (req, res)=>{
		
		let data = user.findOne({username:'naveen'});


		// data.update({email: 'vedala.naveen@gmail.cm'})
		
		data.select('email mobile');

		data.exec((err, info)=>{
			res.send(info);
		})

	})



router.post('/register', (req, res)=>{
	console.log(req.body)
    user.create(req.body, (err, info)=>{
    	if(info){
    		console.log("User registered")
    		res.redirect('login');
    	}
    })
})

router.post('/login',
  passport.authenticate('local', { successRedirect: '/rest',
                                   failureRedirect: '/rest/login'})
);

router.get('/auth/facebook', passport.authenticate('facebook'));


router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));



module.exports = router;