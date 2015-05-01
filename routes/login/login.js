var express = require("express");
var router  = express.Router();

router.get("/", function (req, res) {
	if (req.user == null) {
		res.render("login/login", {
			title : "login Academics"
		});
	} else {
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

router.get("/inicio", function (req, res) {
  res.render("index", {
    title : "Academics",
    user  : req.user
  });
  console.log("Session iniciada correctamente");
});

module.exports = router;