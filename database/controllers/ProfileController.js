/**
* ProfileController
* 
* @version 0.0.1
**/
var ProfileController = function() {

	var self = this;
	self.model = require("./../models/ProfileModel");

	self.getAll = function(done) {
		self.model.getAll(done);
	};

};

// ProfileController extends of AbstractController
ProfileController.prototype = require("./AbstractController");

module.exports = new ProfileController();
