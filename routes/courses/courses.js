var express = require("express");
var router  = express.Router();
var modelCourse = require("../../database/models/course");
var PublicationCourseModel = require("../../database/models/PublicationCourseModel");

router.get("/", function (req, res) {
	if (req.user == null) {
		// No hay un usuario logueado
		res.render("login/login", {
			title : "login Academics"
		});
	} else {
		// Hay un usuario logueado
		modelCourse.getUserCourses(req.user.user_id, function (err, courses) {
			res.render("academics_views/courses/", {
				title : "Academics - courses",
				user : req.user,
				courses : JSON.stringify(courses)
			});
		});
	}
});

router.get("/:idCourse", function (req, res) {
	var idCourse = req.params.idCourse;
	modelCourse.findById(idCourse, function (err, course) {
		if (req.user != null) {
			res.render("academics_views/courses/specific_course", {
				user : req.user,
				course : JSON.stringify(course)
			});
		} else {
			res.render("academics_views/courses/external_user/specific_course", {
				course : JSON.stringify(course)
			});
		}
	});
});

router.post("/createCourse/:course_name", function (req, res) {
	if (req.user != null) {
		// Existe el usuario logueado... entonces se crea el curso
		var course_name = req.params.course_name;
		modelCourse.createNewCourse({
			"user_id_course" : req.user.user_id,
			"course_name" : course_name
		}, function  (err, results) {
			res.send(results);
		});
	}
});

router.post("/publishInCourse/:publication_text", function (req, res) {
	if (req.user != null) {
		// Existe el usuario logueado... entonces se puede publicar
		var publication_text = req.params.publication_text;
		PublicationCourseModel.publishInCourse({
			"user_id_publish" : req.user.user_id,
			"publication_text" : publication_text
		}, function  (err, results) {
			res.send(results);
		});
	}
});

module.exports = router;
