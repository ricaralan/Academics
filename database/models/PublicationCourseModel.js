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

PublicationCourseModel.prototype.get = function (idPublication, callback) {
	db.connect(function (err, connection) {
		db.getR().table(PublicationCourseModel.prototype.tableName)
			.filter({publication_course_id:idPublication}).eqJoin("user_id_publish",
			db.getR().table("user"))
			.run(connection, function (err, cursor) {
			cursor.toArray(function (err, publication){
				json = getJoinJsons(publication[0].left, publication[0].right);
				callback(err, json);
			});
		});
	});
};

function getJoinJsons(json1, json2){
	json = {};
	mergeJson(json, json1);
	mergeJson(json, json2);
	return json
}

function mergeJson(jsonTemp, json){
	for (var key in json){
		jsonTemp[key] = json[key];
	}
}
PublicationCourseModel.prototype.changes = function (callback) {
	db.connect(function (err, connection) {
		db.tableChanges(
			connection,
			PublicationCourseModel.prototype.tableName,
			callback);
	});
};

PublicationCourseModel.prototype.getCoursesSlice = 
	function (jsonFilter, sliceStart, sliceEnd, callback) {
	db.connect(function (err, connection) {
		db.getR().table(PublicationCourseModel.prototype.tableName)
			.filter(jsonFilter).eqJoin("user_id_publish",
			db.getR().table("user")).zip()
			.run(connection, function (err, cursor) {
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
