/**
*	SubCategoryModel
*	@author Alan Olivares
*	@version 0.0.1
*/
var SubCategoryModel = function() {

	var self = this;

	self.table = "academics_sub_category";

	self.getSubCategoriesByCategory = function(idCategory, done) {
		self.academicsConnection.doQuery(
			self.academicsConnection.getR().table(self.table).filter({
				category_id : idCategory
			}), function (err, cursor) {
				try {
					cursor.toArray(function(err, sub_categories) {
						done(err, sub_categories);
					});
				} catch(e) {
					done(e);
				}
		});
	};

}

// SubCategoryModel extends of AbstractModel
SubCategoryModel.prototype = require("./AbstractModel");

module.exports = new SubCategoryModel();
