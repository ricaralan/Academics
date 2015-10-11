/**
* CategoryController
*
* @version 0.0.1
**/
var CategoryController = function() {

	var self = this;
	self.model = require("./../models/CategoryModel"),

};

// CategoryController extends of AbstractController
CategoryController.prototype = require("./AbstractController");

module.exports = new CategoryController();
