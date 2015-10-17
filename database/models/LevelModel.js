/**
*	LevelModel
*	@author Eleazar Fernández
*	@version 0.0.1
*/
var LevelModel = function() {

	var self = this;

	self.table = "academics_level";

	self.getAll = function(done) {
		self.academicsConnection.doQuery(
			self.academicsConnection.getR().table(self.table)
			, function (err, cursor) {
				try {
					cursor.toArray(function(err, levels) {
						done(err, levels);
					});
				} catch(e) {
					done(e);
				}
		});
	};

}

// LevelModel extends of AbstractModel
LevelModel.prototype = require("./AbstractModel");

module.exports = new LevelModel();
