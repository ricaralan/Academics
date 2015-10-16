var express = require("express");
	 router  = express.Router(),
	encriptation = require("./../../util/encriptation")
	userController = require("./../../database/controllers/UserController");

router.get("/", function (req, res) {
	if (!req.user) {
		// No hay un usuario logueado
		res.render("login/login", {
			title : "login Academics"
		});
	} else {
		// Hay un usuario logueado
		res.render("index", {
		    title : "Academics",
		    user  : req.user
		  });
	}
});

router.get("/login", function (req, res) {
	if (!req.user) {
		// No hay un usuario logueado
		res.render("login/login", {
			title : "login Academics"
		});
	} else {
		// Hay un usuario logueado
		res.render("index", {
		    title : "Academics",
		    user  : req.user
		  });
	}
});

router.get("/confirm_email", function(req, res) {
	if (!req.user) {
		// No hay un usuario logueado
		res.render("login/login", {
			title : "login getdate"
		});
	} else {
		// Hay un usuario logueado
		res.render("users/confirm_email/send_confirmation_email", {
		    title : "getdate",
		    user  : req.user
		  });
	}
});

router.get("/confirm_email/:cipherId", function(req, res) {
	if (!req.user) {
		// No hay un usuario logueado
		res.render("login/login", {
			title : "login getdate"
		});
	} else {
		if(req.user.user_id === encriptation.decipher(req.params.cipherId)) {
			if(!req.user.user_confirm_email) {
				// Confirm email if not confirmed
				userController.confirmEmail(req.user.user_id, function(err, data) {
					try {
						req.user.user_confirm_email = data.replaced === 1;
					} catch(e) {console.log(e);}
				});
			}
			res.render("users/confirm_email/correct_confirm", {
			    title : "Confirmation of your account",
			    message : "Your account is verified correctly",
			    user : req.user
			  });
		} else {
			// incorrect cipher id
			message =  !req.user.user_confirm_email?"An error occurred with the verification":"Your Account had already been verified";
			res.render("users/confirm_email/incorrect_confirm", {
			    title : "Error - confirmation of your account",
			    message : message,
			    user : req.user
			  });
		}
	}
});

router.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/");
});

module.exports = router;