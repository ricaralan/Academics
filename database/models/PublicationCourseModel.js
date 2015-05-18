/**
*	Modelo de la tabla user que hace más fácil 
*	la manipulación de los datos de esta tabla
*
*	@author Team Academics
*/
var db = require("./../driver/rethinkdb_driver");
var socket = require("socket.io");

var PublicationCourseModel = function () {
	this.setTableName("publication_course");
};

PublicationCourseModel.prototype.setTableName = function(table) {
	PublicationCourseModel.prototype.tableName = table;
};

PublicationCourseModel.prototype.publishInCourse =
	function (jsonDataNewPublication, callback) {
	db.connect(function (err, connection) {
		db.insert(
			connection,
			PublicationCourseModel.prototype.tableName,
			jsonDataNewPublication,
			callback);
	});
};

module.exports = new PublicationCourseModel();
