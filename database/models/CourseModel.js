/**
*	CourseModel
*	@author Alan Olivares
*	@version 0.0.1
*/
var CourseModel = function() {

	var self = this;

	self.table = "academics_course";

}

// CourseModel extends of AbstractModel
CourseModel.prototype = require("./AbstractModel");

module.exports = new CourseModel();
