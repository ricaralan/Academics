/**
*	AcademicsConnection
*
*	@author Alan Olivares
*	@version 0.0.1
*/
module.exports = {

	__r : require("rethinkdb"),

	__connect : function(done){
		this.__r.connect(configConnection, done);
	},

	getR : function() {
		return this.__r;
	},

	/**
	*	this method execute a query in ReQL
	*/
	doQuery : function(objQuery, done) {
		this.__connect(function(err, connection) {
			try {
				if(err) {
					throw new Error("ERROR CONNECTION :" + err);
				}
				objQuery.run(connection, done).finally(function() {
					connection.close();
				});
			} catch(e) {
				console.log(e.message);
			}
		});
	}
};

/**
*	@var configConnection is a private variable
*/
var configConnection = require("./ConfigConnection");
