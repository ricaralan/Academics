/**
*	CategoryModel
*	@author Alan Olivares
*	@version 0.0.1
*/
var CategoryModel = function() {

	var self = this;

	self.table = "academics_category";

	self.getAll = function(done) {
		self.academicsConnection.doQuery(
			self.academicsConnection.getR().table(self.table)
			.orderBy("category_created"), function (err, cursor) {
				try {
					cursor.toArray(function(err, categories) {
						done(err, categories);
					});
				} catch(e) {
					done(e);
				}
		});
	};

}

// CategoryModel extends of AbstractModel
CategoryModel.prototype = require("./AbstractModel");

module.exports = new CategoryModel();
