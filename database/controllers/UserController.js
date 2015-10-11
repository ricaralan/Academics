/**
* UserController
*
* @version 0.0.1
**/
var UserController = function() {

	var self = this;
	self.model = require("./../models/UserModel"),
	encriptation = require("./../../util/encriptation");

	self.getUserIfExist = function(email, password, done) {
		self.model.getUserIfExist(email, encriptation.cipher(password), done);
	};

	self.getByEmail = function(email, done) {
		self.model.getByEmail(email, done);
	};

	self.insert = function(json, done) {
		if(json.user_password) {
			json.user_password = encriptation.cipher(json.user_password);
		}
		if(json.user_email) {
			self.getByEmail(json.user_email, function(err, users) {
				if(!err && users.length === 0) {
					self.model.insert(json, done);
				} else {
					done({error : err, userExist : users.length > 0});
				}
			});
		} else {
			self.model.insert(json, done);
		}
	};

};

// UserController extends of AbstractController
UserController.prototype = require("./AbstractController");

module.exports = new UserController();
