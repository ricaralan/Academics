/**
* CategoryController
*
* @version 0.0.1
**/
var CategoryController = function() {

	var self = this;
	self.model = require("./../models/LanguajeModel");

	self.getAll = function(done) {
		self.model.getAll(done);
	};

};

// CategoryController extends of AbstractController
CategoryController.prototype = require("./AbstractController");

module.exports = new CategoryController();
