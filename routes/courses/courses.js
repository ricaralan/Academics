var express = require("express");
var router  = express.Router();
var modelCourse = require("../../database/models/course");

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

router.post("/createCourse/:courseName", function (req, res) {
	if (req.user != null) {
		// Existe el usuario logueado... entonces se crea el curso
		var courseName = req.params.courseName;
		modelCourse.createNewCourse({
			"user_id_course" : req.user.user_id,
			"courseName" : courseName
		}, function  (err, results) {
			if (results.inserted == 1) {
				res.send("El curso " + courseName + " se registro correctamente!");
			}
		});
	}
});

module.exports = router;
