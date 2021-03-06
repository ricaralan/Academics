/**
*	UserModel
*	@author Alan Olivares
*	@version 0.0.1
*/
var UserModel = function() {

	var self = this;

	self.table = "academics_user";

	self.getUserIfExist = function(email, password, done) {
		self.academicsConnection.doQuery(
			self.academicsConnection.getR()
			.table(self.table)
			.filter({
				user_email : email,
				user_password : password
			}).limit(1)
			, function(err, cursor) {
				try {
					cursor.toArray(function(err, users) {
						done(err, (users.length == 1) ? users[0] : null);
					});
				} catch(e) {
					done(e);
				}
			});
	};

	self.getByEmail = function(email, done) {
		self.academicsConnection.doQuery(
			self.academicsConnection.getR().table(self.table)
			.filter({user_email : email})
			, function(err, cursor) {
				try {
					cursor.toArray(done);
				} catch(e) {
					done(e);
				}
		}, done);
	};

	self.confirmEmail = function(userId, done) {
		self.academicsConnection.doQuery(
			self.academicsConnection.getR().table(self.table).get(userId).update({
				user_confirm_email : true
			}), done);
	};

}

// UserModel extends of AbstractModel
UserModel.prototype = require("./AbstractModel");

module.exports = new UserModel();
