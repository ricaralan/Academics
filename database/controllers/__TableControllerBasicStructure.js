/**
* __TableControllerBasicStructure
*
* @version 0.0.1
**/
var __TableControllerBasicStructure = function() {

	var self = this;
	self.model = require("./../models/__TableModelBasicStructure");

};

// __TableControllerBasicStructure extends of AbstractController
__TableControllerBasicStructure.prototype = require("./AbstractController");

module.exports = new __TableControllerBasicStructure();
