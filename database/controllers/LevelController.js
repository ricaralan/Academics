/**
* LevelController
* 
* @version 0.0.1
**/
var LevelController = function() {

	var self = this;
	self.model = require("./../models/LevelModel");

	self.getAll = function(done) {
		self.model.getAll(done);
	};

};

// LevelController extends of AbstractController
LevelController.prototype = require("./AbstractController");

module.exports = new LevelController();
