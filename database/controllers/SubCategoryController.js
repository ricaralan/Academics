/**
* SubCategoryController
*
* @version 0.0.1
**/
var SubCategoryController = function() {

	var self = this;
	self.model = require("./../models/SubCategoryModel"),

};

// SubCategoryController extends of AbstractController
SubCategoryController.prototype = require("./AbstractController");

module.exports = new SubCategoryController();
