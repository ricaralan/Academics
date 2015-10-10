/**
* AbstractController
*
* @author Alan Olivares
* @version 0.0.1
**/
module.exports = function() {

	var self = this;

	self.model = null;

	self.getById = function(id, done) {
		try {
			self.model.getById(id, done);
		} catch(e) {
			console.log(e);
			throw new Error("ERROR: ABSTRACT MODEL REQUIRES A MODEL ", e);
		}
	};

	self.insert = function(jsonData, done) {
		try {
			self.model.insert(jsonData, done);
		} catch(e) {
			console.log(e);
			throw new Error("ERROR: ABSTRACT MODEL REQUIRES A MODEL ", e);
		}
	};
	
	self.update = function(id, json, done) {
		try {
			self.model.update(id, json, done);
		} catch(e) {
			console.log(e);
			throw new Error("ERROR: ABSTRACT MODEL REQUIRES A MODEL ", e);
		}
	};
	
	self.delete = function(id, done) {
		try {
			self.model.delete(id, done);
		} catch(e) {
			console.log(e);
			throw new Error("ERROR: ABSTRACT MODEL REQUIRES A MODEL ", e);
		}
	};

};
