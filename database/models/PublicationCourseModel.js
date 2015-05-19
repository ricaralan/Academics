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

PublicationCourseModel.prototype.getCoursesSlice = 
	function (jsonFilter, sliceStart, sliceEnd, callback) {
	db.connect(function (err, connection) {
		/*db.getDataTableFilterSlice
		(connection, PublicationCourseModel.prototype.tableName,
			jsonFilter, sliceStart, sliceEnd, callback);*/
		db.getR().table(PublicationCourseModel.prototype.tableName).filter(jsonFilter)
			.eqJoin("user_id_publish",db.getR().table("user")).zip().run(connection, function (err, cursor) {
			cursor.toArray(callback);
		});
	});
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
