/**
*	LanguajeModel
*	@author Alan Olivares
*	@version 0.0.1
*/
var LanguajeModel = function() {

	var self = this;

	self.table = "academics_languaje";

	self.getAll = function(done) {
		self.academicsConnection.doQuery(
			self.academicsConnection.getR().table(self.table)
			, function (err, cursor) {
				try {
					cursor.toArray(function(err, laguajes) {
						done(err, laguajes);
					});
				} catch(e) {
					done(e);
				}
		});
	};

}

// LanguajeModel extends of AbstractModel
LanguajeModel.prototype = require("./AbstractModel");

module.exports = new LanguajeModel();
