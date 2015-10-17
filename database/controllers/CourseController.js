/**
* CourseController
*
* @version 0.0.1
**/
var CourseController = function() {

	var self = this;
	self.model = require("./../models/CourseModel");

};

// CourseController extends of AbstractController
CourseController.prototype = require("./AbstractController");

module.exports = new CourseController();
