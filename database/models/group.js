/**
*	Modelo de la tabla user que hace más fácil 
*	la manipulación de los datos de esta tabla
*
*	@author Team Academics
*/
var db = require("./../driver/rethinkdb_driver");
var socket = require("socket.io");

var GroupModel = function () {
	this.setTableName("group");
};

GroupModel.prototype.setTableName = function(table) {
	GroupModel.prototype.tableName = table;
};

/*GroupModel.prototype.findById = function (userId, callback) {
	db.connect(function (err, connection) {
		db.findById(connection, GroupModel.prototype.tableName, userId, callback);
	});
};

GroupModel.prototype.createNewUser = function (jsonDataNewUser, callback) {
	db.connect(function (err, connection) {
		db.insert(connection, GroupModel.prototype.tableName, jsonDataNewUser, callback);
	});
};*/

module.exports = new GroupModel();