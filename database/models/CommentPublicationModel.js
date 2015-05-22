/**
*	Modelo de la tabla user que hace más fácil 
*	la manipulación de los datos de esta tabla
*
*	@author Team Academics
*/
var db = require("./../driver/rethinkdb_driver");
var socket = require("socket.io");

var CommentPublicationModel = function () {
	this.setTableName("comment_publication");
};

CommentPublicationModel.prototype.setTableName = function(table) {
	CommentPublicationModel.prototype.tableName = table;
};

CommentPublicationModel.prototype.get = function (idPublication, callback) {
	// GET ALL COMMENTS OF PUBLICATION...
	// TODO SET SLICE COMMENTS...
	db.connect(function (err, connection) {
		db.getR().table(CommentPublicationModel.prototype.tableName)
			.filter({publication_id_comment:idPublication})
			.eqJoin("publication_id_comment",
			db.getR().table("publication_course"))
			.run(connection, function (err, cursor) {
				if (err){
					console.log(err);
				}
			cursor.toArray(function (err, comment){
				var json = [];
				for (var i = 0; i < comment.length; i++) {
					json [i] = getJoinJsons(comment[i].left, comment[i].right);
				}
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


CommentPublicationModel.prototype.commentInPublish =
	function (jsonDataNewCommentPublication, callback) {
	db.connect(function (err, connection) {
		db.insert(
			connection,
			CommentPublicationModel.prototype.tableName,
			jsonDataNewCommentPublication,
			callback);
	});
};

module.exports = new CommentPublicationModel();
