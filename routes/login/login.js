var express = require("express");
var router  = express.Router();

router.get("/", function (req, res) {
	if (req.user == null) {
		// No hay un usuario logueado
		res.render("login/login", {
			title : "login Academics"
		});
	} else {
		// Hay un usuario logueado
		res.render("academics_views", {
		    title : "Academics",
		    user  : req.user
		  });
	}
});

router.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/");
});

module.exports = router;