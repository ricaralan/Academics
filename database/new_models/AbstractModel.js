/**
* AbstractModel
* @author Alan Olivares
* @version 0.0.1
* @description This class was meant to be the super class of the models
*/
module.exports = function() {

	/**
	*	@var getDateConnection is a object that will help us connect with the database
	**/
	this.getDateConnection = require("./../connection/GetDateConnection");

	/**
	*	@var table from database to override on child classes
	**/
	this.table = "dummyTable";

	/**
	*	This method obtains data with an id value
	*
	*	@param id is a unique value
	*	@param done is a callback
	**/
	this.getById = function(id, done) {
		this.getDateConnection.doQuery(
			this.getDateConnection.getR().table(this.table).get(id), done);
	};

	/**
	*	This method insert a json data object on table
	*
	*	@param json is a json data object that contains the data to insert
	*	@param done is a callback
	**/
	this.insert = function(json, done) {
		this.getDateConnection.doQuery(
			this.getDateConnection.getR().table(this.table).insert(json)
			, done);
	};

	/**
	*	This method update data with json data object and id
	*
	*	@param id is an identifier
	*	@param json is data to update
	*	@param is a callback
	**/
	this.update = function(id, json, done) {
		this.getDateConnection.doQuery(
			this.getDateConnection.getR().table(this.table).get(id).update(json)
			, done);
	};

	/**
	*	This method delete from database by id
	*
	*	@param id is an identifier
	*	@param is a callback
	**/
	this.delete = function(id, done) {
		this.getDateConnection.doQuery(
			this.getDateConnection.getR().table(this.table).get(id).delete()
			, done);
	};

	/**
	*	This method notifies when there changes(UPDATES OR DELETES)
	*
	*	@param done is a callback
	**/
	this.changes = function(done) {
		this.getDateConnection.doQuery(
			this.getDateConnection.getR().table(this.table).changes()
			, done);
	};

};
