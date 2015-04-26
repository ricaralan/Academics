var db = require("./../driver/rethinkdb_driver");
var socket = require("socket.io");

var FirstModel = function (table){
	this.setTableName(table);
};

FirstModel.prototype.setTableName = function (table){
	FirstModel.prototype.tableName = table;
};

FirstModel.prototype.setReturnValue = function (value) {
	FirstModel.prototype.returnValue = value;
}

FirstModel.prototype.insert = function (jsonDataInsert){
	var resultados;
	var res = [];
	db.connect(function(err, connection, val){
		db.insert(connection, FirstModel.prototype.tableName, jsonDataInsert,
			function (err, results) {
				if (err) {
					console.log("ERROR al insertar rethinkdb_driver: "
						+ err.message);
				}
				FirstModel.prototype.setReturnValue(results);
				res = results;
				resultados = results;
			});
	});
	console.log(res + " - " + resultados);
	return 0;
};

module.exports = FirstModel;