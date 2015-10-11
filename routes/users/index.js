var express = require("express"),
	router = express.Router(),
	userController = require("./../../database/controllers/UserController");

router.get("/", function(req, res) {
	res.send(":v");
});

router.post("/create", function(req, res) {
	userController.insert({
	    user_first_name  : req.body.user.firstName,
	    user_last_name   : req.body.user.lastName,
	    user_confirm_email  : false,
	    user_login_type : "local",
	    user_email : req.body.user.email,
	    user_password : req.body.user.password1
  	}, function(err, data) {
		console.log(":v", err, data);
		res.send({success : !err && data.inserted == 1});
	});
});

module.exports = router;
