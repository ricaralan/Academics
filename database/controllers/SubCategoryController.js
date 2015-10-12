/**
* SubCategoryController
*
* @version 0.0.1
**/
var SubCategoryController = function() {

	var self = this;
	self.model = require("./../models/SubCategoryModel");

	self.getSubCategoriesByCategory = function(idCategory, done) {
		self.model.getSubCategoriesByCategory(idCategory, done);
	};

};

// SubCategoryController extends of AbstractController
SubCategoryController.prototype = require("./AbstractController");

module.exports = new SubCategoryController();
