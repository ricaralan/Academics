var express = require("express"),
	router  = express.Router(),
	courseController = require("./../../database/controllers/CourseController");

router.get("/", function(req, res) {
	// get page with courses
	res.render("courses");
});

router.get("/me", function(req, res) {
	// get pages with my courses "tomando", "enseñando", "favoritos"...
	res.render("courses/me");
});

router.get("/me/get/own", function(req, res) {
	// get view with own courses
	res.render("courses/me/showOwnCourses");
});

router.get("/me/admin", function(req, res) {
	// admin my own courses
});

router.get("/me/get/:courseId", function(req, res) {
	// get pages sspecifict course
});

router.get("/me/create", function(req, res) {
	// get view create course
	res.render("courses/me/createCourse");
});

router.post("/create", function(req, res) {
	// create course
	try {
		course = req.body.data.course;
		courseController.insert( {
			languaje_id : course.languaje_id,
			category_id : course.category_id,
			sub_category_id : course.sub_category_id,
			course_name : course.name
		}, function(err, data) {
			console.log(err, data);
			res.send(data);
		});
	} catch(e) {
		res.send({error : "not found"});
	}
});

router.get("/update-basic-data", function(req, res) {
	// get view update basic data
	res.render("courses/me/updateBasicData");
});

router.put("/update/:course_id", function(req, res) {
	// update course
});

router.delete("/delete/course_id", function(req, res) {
	// delete specifict course
});

module.exports = router;
