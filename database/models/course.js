/**
*	Modelo de la tabla user que hace más fácil 
*	la manipulación de los datos de esta tabla
*
*	@author Team Academics
*/
var db = require("./../driver/rethinkdb_driver");
var socket = require("socket.io");

var CourseModel = function () {
	this.setTableName("course");
};

CourseModel.prototype.setTableName = function(table) {
	CourseModel.prototype.tableName = table;
};

module.exports = new CourseModel();