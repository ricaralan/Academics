/**
*	ProfileModel
*	@author Eleazar Fernández
*	@version 0.0.1
*/
var ProfileModel = function() {

	var self = this;

	self.table = "academics_profile";

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

// ProfileModel extends of AbstractModel
ProfileModel.prototype = require("./AbstractModel");

module.exports = new ProfileModel();
