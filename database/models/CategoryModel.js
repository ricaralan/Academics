/**
*	CategoryModel
*	@author Alan Olivares
*	@version 0.0.1
*/
var CategoryModel = function() {

	var self = this;

	self.table = "academics_category";

}

// CategoryModel extends of AbstractModel
CategoryModel.prototype = require("./AbstractModel");

module.exports = new CategoryModel();
