var express = require("express");
var router  = express.Router();

router.get("/", function (req , res) {
	if (req.user == null) {
		// No hay un usuario logueado
		res.render("login/login", {
			title : "login Academics"
		});
	} else {
		// Hay un usuario logueado
		res.render("academics_views/groups/", {
			title : "Grupos "
		});
		
	}
});

router.get("/idGroup", function (req , res) {
	 var idGroup = req.params.idGroup;
});

module.exports = router;
