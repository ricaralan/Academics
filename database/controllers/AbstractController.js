/**
* AbstractController
*
* @author Alan Olivares
* @version 0.0.1
**/
var AbstractController = function() {

	var self = this;

	this.model = null;

	this.getById = function(id, done) {
		try {
			this.model.getById(id, done);
		} catch(e) {
			console.log(e);
			throw new Error("ERROR: ABSTRACT MODEL REQUIRES A MODEL ", e);
		}
	};

	this.insert = function(jsonData, done) {
		try {
			this.model.insert(jsonData, done);
		} catch(e) {
			console.log(e);
			throw new Error("ERROR: ABSTRACT MODEL REQUIRES A MODEL ", e);
		}
	};
	
	this.update = function(id, json, done) {
		try {
			this.model.update(id, json, done);
		} catch(e) {
			console.log(e);
			throw new Error("ERROR: ABSTRACT MODEL REQUIRES A MODEL ", e);
		}
	};
	
	this.delete = function(id, done) {
		try {
			this.model.delete(id, done);
		} catch(e) {
			console.log(e);
			throw new Error("ERROR: ABSTRACT MODEL REQUIRES A MODEL ", e);
		}
	};

};

module.exports = new AbstractController();
