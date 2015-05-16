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

/**
*	Este metodo regresa los cursos creados por el usuario
*/
CourseModel.prototype.getUserCourses = function (userId, callback) {
	db.connect(function (err, connection) {
		db.getDataTableFilter(
			connection,
			CourseModel.prototype.tableName,
			{user_id_course:userId},
			callback);
	});
};

CourseModel.prototype.findById = function (userId, callback) {
	db.connect(function (err, connection) {
		db.findById(connection, CourseModel.prototype.tableName, userId, callback);
	});
};

CourseModel.prototype.createNewCourse = function (jsonDataNewCourse, callback) {
	db.connect(function (err, connection) {
		db.insert(connection, CourseModel.prototype.tableName, jsonDataNewCourse, callback);
	});
};

module.exports = new CourseModel();
