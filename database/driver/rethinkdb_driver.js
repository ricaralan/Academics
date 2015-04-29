/***
*	Esta librería facilita el uso y manipulación de la base de datos
*
*	@version 0.0.2
*	@author Team Academics
*/

var rethinkdb = require("rethinkdb");

/**
*	Creación de la clase DB con los atributos necesarios para la conexión
*/
var DB = function  () {
	this.dbConfig = {
		host: process.env.RDB_HOST || 'localhost',
		port: parseInt(process.env.RDB_PORT) || 28015,
		dbName  : process.env.RDB_DB || 'academics_db',
		tables:[
	    	{descripcion : require("./../academics_tables/academics_usuario")}
		]
	};
	// Objeto rethinkdb que ayuda a realizar las consultas a la DB de rethinkdb
	this.r = rethinkdb;
};

/**
*	Obtenemos el nombre de la base de datos actual
*/
DB.prototype.getDBName = function() {
	return this.dbConfig.dbName;
};

/**
*	Obtenemos el host en donde se encuentra la DB
*/
DB.prototype.getHost = function() {
	return this.dbConfig.host;
};

/**
*	Obtenemos el puerto de la DB
*/
DB.prototype.getPort = function() {
	return this.dbConfig.port;
};

/**
*	Este metodo retorna una conexion que se ve reflejada en el callback
*	Ejemplo:
*	new DB().connect(function (err, connection) {
*		@param err: Objeto que identifica si hay un error y en caso de haber
*				   error lo describe.
*		@param connection: Es un objeto que ayuda a hacer consultas a la DB.
*	});
*
*/
DB.prototype.connect = function(callback){
	this.r.connect({
		host : this.getHost(),
		post : this.getPort()
	}, callback);
};

/**
*	Obtenemos las tablas que estan el json dbConfig de la clase DB
*/
DB.prototype.getTables = function() {
	return this.dbConfig.tables;
};

/**
*	Si la base de datos no esta creada... la creamos con este método
*	@param connection: Objeto que guarda una conexion con la DB
*/
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

/**
*	Se crean las tablas especificadas en el JSON dbConfig de la clase DB
*	@param connection: Objeto que guarda una conexion con la DB
*/
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

/**
*	Iniciazar la base de datos con las tablas especificadas
*	@param connection: Objeto que guarda una conexion con la DB
*/
DB.prototype.makeDB = function (connection) {
	// Aquí se crea la DB
	this.createDB(connection);
	// Aquí se crean las tablas
	this.createTables(connection);
};

/**
*	Buscar por ID en una tabla especifica
*	Ejemplo:
*	new DB().findById (connection, table, valueId, function (err, results) {
*		@param connection: Objeto que hace una conexión con nuestra DB
*		@param table: Nombre de la tabla a buscar
*		@param valueId: Id del registro que queremos
*		@param callback: Función con la que se puede interactuar con los datos...
*	});
*/
DB.prototype.findById = function (connection, table, valueId, callback) {
	this.r.db(this.getDBName()).table(table).get(valueId).run(connection, callback);
};

/**
*	Insetar un registro en una tabla
*	Ejemplo:
*	new DB().insert (connection, table, jsonDataInsert, function (err, results) {
*		@param connection: Objeto que hace una conexión con nuestra DB
*		@param table: Nombre de la tabla donde se guardará el nuevo registro
*		@param jsonDataInsert: json {campo : valor} a registrar
*		@param callback: Funcion que permite interactuar con el resultado
*						 y saber si el regitro concluyo correctamente
*	});
*/
DB.prototype.insert = function (connection, table, jsonDataInsert, callback) {
	this.r.db(this.getDBName()).table(table).insert(jsonDataInsert)
		.run(connection, callback);
};

/**
*	Actualizar un registro en una tabla por su id
*	Ejemplo:
*	new DB().update (connection, table, valueId, jsonDataUpdate,
*		function (err, results) {
*			@param connection: Objeto que hace una conexión con nuestra DB
*			@param table: Nombre de la tabla donde se actualizará el registro
*			@param valueId: Valor del id del registro a actualizar
*			@param jsonDataUpdate: json {campo : nuevoValor} con los
*								    valores a actualizar
*			@param callback: Funcion que permite interactuar con el resultado
*							 y saber si la actualización concluyo correctamente
*	});
*/
DB.prototype.update = function (connection, table, valueId, jsonDataUpdate, callback) {
	this.r.db(this.getDBName()).table(table).get(valueId)
		.update(jsonDataUpdate).run(connection, callback);
};

/**
*	Eliminar un registro en una tabla por su id
*	Ejemplo:
*	new DB().delete (connection, table, valueId, function (err, results) {
*		@param connection: Objeto que hace una conexión con nuestra DB
*		@param table: Nombre de la tabla donde se eliminará el registro
*		@param valueId: Valor del id del registro a eliminar
*		@param callback: Funcion que permite interactuar con los resultados
*						 saber si se actualizó correctamente
*	});
*/
DB.prototype.delete = function (connection, table, valueId, callback) {
	this.r.db(this.getDBName()).table(table).get(valueId).delete().run(connection, callback);
};

DB.prototype.tableChanges = function (connection, table, callback) {
	this.r.db(this.getDBName()).table(table).changes().run(connection, callback);

}

var db = new DB();

db.connect(function(err, connection){
	/*
	db.makeDB(connection);
	db.tableChanges(connection, "usuario", function(err, cursor){
		cursor.each(console.log);
	});
	*/
});

module.exports = db;