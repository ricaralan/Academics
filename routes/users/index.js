var express = require("express"),
	router = express.Router(),
	userController = require("./../../database/controllers/UserController"),
	passport = require("passport");

router.get("/", function(req, res) {
	console.log(req.user);
	res.send(":v");
});

router.post("/create", function(req, res) {
	try {
		userController.insert({
		    user_first_name  : req.body.user.firstName,
		    user_last_name   : req.body.user.lastName,
		    user_confirm_email  : false,
		    user_login_type : "local",
		    user_email : req.body.user.email,
		    user_password : req.body.user.password1
	  	}, function(err, data) {
	  		if(!err && data.inserted === 1) {
	  			// Set credentials logIn
	  			req.body.username = req.body.user.email;
	        	req.body.password = req.body.user.password1;
				userController.getById(data.generated_keys[0], function(err, user) {
		          passport.authenticate('local', function(err, user, info) {
		          	// Set variable session
		            req.logIn(user, function(err) {
		              res.send({
		                success : true,
		                userExist : err.userExist,
		                emailComprobado : false
		                });
		            });
		          })(req, res);
		        });
	  		} else {
	  			res.send({success : false, userExist : err.userExist});
	  		}
		});
	} catch(e) {
		console.log("ERROR CREATING USER: " + e);
		res.send({success : false});
	}
});

module.exports = router;
