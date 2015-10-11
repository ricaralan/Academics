/**
*	SubCategoryModel
*	@author Alan Olivares
*	@version 0.0.1
*/
var SubCategoryModel = function() {

	var self = this;

	self.table = "academics_sub_category";

}

// SubCategoryModel extends of AbstractModel
SubCategoryModel.prototype = require("./AbstractModel");

module.exports = new SubCategoryModel();
