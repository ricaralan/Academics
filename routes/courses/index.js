var express = require("express"),
	router  = express.Router();

router.get("/", function(req, res) {
	// get page with courses
	res.render("courses");
});

router.get("/me", function(req, res) {
	// get pages with my courses
	res.render("courses/me");
});

router.get("/me/get/:courseId", function(req, res) {
	// get pages sspecifict course
});

router.get("/own/admin", function(req, res) {
	// get pages with my courses
});

module.exports = router;
