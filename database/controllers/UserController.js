/**
* UserController
*
* @version 0.0.1
**/
var UserController = function() {

	var self = this;

	self.model = require("./../models/UserModel");

	self.getUserIfExist = function(email, password, done) {
		self.model.getUserIfExist(email, password, done);
	};

};

UserController.prototype = require("./AbstractController");

module.exports = new UserController();
