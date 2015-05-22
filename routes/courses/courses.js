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
		/*
		modelCourse.getUserCourses(req.user.user_id, function (err, courses) {
			res.render("academics_views/courses/", {
				title : "Academics - courses",
				user : req.user,
				courses : JSON.stringify(courses)
			});
		});
		*/
		res.render("academics_views/courses/", {
			title : "Academics - courses",
			user : req.user
		});
	}
});

router.get("/:idCourse", function (req, res) {
	var idCourse = req.params.idCourse;
	modelCourse.findById(idCourse, function (err, course) {
		if (course != null) {
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
		} else {
			if (req.user != null) {
					res.render("academics_views/courses/not_found_course", {
						user : req.user,
						course : JSON.stringify(course)
					});
			} else {
				res.render("academics_views/courses/external_user/not_found_course", {
					course : JSON.stringify(course)
				});
			}
		}
	});
});

router.get("/get/coursesUser", function (req, res) {
	console.log("courses user");
	if (req.user != null) {
		modelCourse.getUserCourses(req.user.user_id, function (err, courses) {
			res.send(courses);
		});
	}
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

router.delete("/deleteCourse/:course_id", function (req, res){
	// Si hay un usuario... se ejecuta la accion
	if (req.user != null) {
		var course_id = req.params.course_id;
		// Recuperamos el curso...
		modelCourse.findById(course_id, function (err, course) {
			// Si hay un curso...
			if (course != null){
				// Si el curso pertenece al usuario logueado... Eliminamos
				if (course.user_id_course == req.user.user_id) {
					modelCourse.deleteCourse(course_id, function (err, data) {
						res.send(data.deleted == 1);
					});
				} else {
					res.send(false);
				}
			}
		});
	}
});

module.exports = router;
