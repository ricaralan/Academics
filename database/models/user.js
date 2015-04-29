/**
*	Modelo de la tabla usuario que hace más fácil 
*	la manipulación de los datos de esta tabla
*
*	@author Team Academics
*/
var db = require("./../driver/rethinkdb_driver");
var socket = require("socket.io");

var UserModel = function () {
	this.setTableName("usuario");
};

UserModel.prototype.setTableName = function(table) {
	UserModel.prototype.tableName = table;
};

UserModel.prototype.findById = function (userId, callback) {
	db.connect(function (err, connection) {
		db.findById(connection, UserModel.prototype.tableName, userId, callback);
	});
};

UserModel.prototype.createNewUser = function (jsonDataNewUser, callback) {
	db.connect(function (err, connection) {
		db.insert(connection, UserModel.prototype.tableName, jsonDataNewUser, callback);
	});
};

module.exports = new UserModel();