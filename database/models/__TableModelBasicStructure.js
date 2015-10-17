 /**
*	__TableModelBasicStructure
*	@author Alan Olivares
*	@version 0.0.1
*/
var __TableModelBasicStructure = function() {

	var self = this;

	self.table = "";

}

// __TableModelBasicStructure extends of AbstractModel
__TableModelBasicStructure.prototype = require("./AbstractModel");

module.exports = new __TableModelBasicStructure();
