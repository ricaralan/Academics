/***
*	Esta librería facilita el uso y manipulación de la base de datos
*
*	@version 0.0.1
*	@author Team Academics
*/

var rethinkdb = require("rethinkdb");

var DB = function  () {
	this.dbConfig = {
		host: process.env.RDB_HOST || 'localhost',
		port: parseInt(process.env.RDB_PORT) || 28015,
		dbName  : process.env.RDB_DB || 'academics_db',
		tables:[
	    	{descripcion : require("./../academics_tables/academics_usuario")}
		]
	};
	this.r = rethinkdb;
};

DB.prototype.getDBName = function() {
	return this.dbConfig.dbName;
};

DB.prototype.getHost = function() {
	return this.dbConfig.host;
};

DB.prototype.getPort = function() {
	return this.dbConfig.port;
};

DB.prototype.connect = function(callback){
	this.r.connect({
		host : this.getHost(),
		post : this.getPort()
	}, callback);
};

DB.prototype.getTables = function() {
	return this.dbConfig.tables;
};

DB.prototype.createDB = function(connection) {
	this.r.dbCreate(this.getDBName()).run(connection,
		function (err, results){
			if (err){
				console.log("ERROR rethinkdb: " + err.message);
			} else {
				console.log("La base de datos se creó correctamente!");
			}
		});
};

DB.prototype.createTables = function (connection){
	tables = this.getTables();
	for (var i = 0; i < tables.length; i++){
		tabla = tables[i].descripcion.table;
		this.r.db(this.getDBName()).tableCreate(tabla.name,{
			primaryKey : tabla.key
		}
		).run(connection, function(err, results){
			if (err){
				console.log("ERROR rethinkdb: " + err.message);
			}else{
				console.log("tabla creada");
			}
		});
	}
};

DB.prototype.makeDB = function (connection) {
	this.createDB();
	this.createTables();
};

DB.prototype.getRow = function (connection, table, valueId, callback) {
	this.r.db(this.getDBName()).table(table).get(valueId).run(connection, callback);
};

DB.prototype.insert = function (connection, table, jsonDataInsert, callback) {
	this.r.db(this.getDBName()).table(table).insert(jsonDataInsert)
		.run(connection, callback);
};

DB.prototype.update = function (connection, table, valueId, jsonDataUpdate, callback) {
	this.r.db(this.getDBName()).table(table).get(valueId)
		.update(jsonDataUpdate).run(connection, callback);
};

DB.prototype.delete = function (connection, table, valueId, callback) {
	this.r.db(this.getDBName()).table(table).get(valueId).delete().run(connection, callback);
};

DB.prototype.tableChanges = function (connection, table, callback) {
	this.r.db(this.getDBName()).table(table).changes().run(connection, callback);
}

var db = new DB();

	/*
db.connect(function(err, connection){
	//db.makeDB(connection);
	db.insert(connection, "usuario", {
		"id_usuario" : 2,
		"usuario" : "alan",
		"nombre"  : "alan"
	}, function(err, results){
		if (err) {
			console.log("ERROR insert rethinkdb: " + err.message);
		}else{
			console.log(results);
		}
	});
	
	db.update(connection, "usuario", 2, {
		"usuario" : "usuario Alan",
		"nombre" : "Alan Olivares"
	}, function(err, results){
		if (err){
			console.log("ERROR update rethinkdb: " + err.message);
		}else{
			console.log(results);
		}
	});
	
	db.delete(connection, "usuario", 1, function (err, results) {
		if (err) {
			console.log("ERROR delete rethinkdb: " + err.message);
		} else {
			console.log(results);
		}
	});
	db.getRow(connection, "usuario", 2, function (err, results) {
		if (err) {
			console.log("ERROR get data rethinkdb: " +err.message);
		} else {
			console.log(results);
		}
	});
	db.tableChanges(connection, "usuario", function(err, cursor){
		cursor.each(console.log);
	});
});
	*/


module.exports = db;