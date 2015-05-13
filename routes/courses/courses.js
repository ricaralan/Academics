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
		res.render("academics_views/courses/", {
			title : "Academics - courses"
		});
	}
});

router.get("/:idCourse", function (req, res) {
	var idCourse = req.params.idCourse;
});

module.exports = router;
