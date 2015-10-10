var Test = function() {
  /**
  * INIT PRIVATE VARIABLES
  */
  var r = require("rethinkdb"),
      assert = require("assert"),
      configConnection = {
    		host : process.env.RDB_HOST || 'localhost',
    		port : parseInt(process.env.RDB_PORT) || 28015
    	}, self = this;

  this.getConnection = function(done) {
    return r.connect(configConnection, done);
  };

  this.createDB = function(dbName, done) {
    this.getConnection(function(err, connection) {
      r.dbCreate(dbName).run(connection, done).finally(function() {
        connection.close();
      });
    });
  };

  this.createTable = function(dbName, tableName, options, done) {
    this.getConnection(function(err, connection) {
      r.db(dbName).tableCreate(tableName, options).run(connection, done)
        .finally(function() {
        connection.close();
      });
    });
  };

  this.createTables = function(dbName, tables, done) {
    this.getConnection(function(err, connection) {
      self.createDB(dbName, function() {
        for(var i = 0; i < tables.length; i++) {
          r.db(dbName).tableCreate(tables[i].tableName, tables[i].options).run(connection, done)
            .finally(function() {
            connection.close();
          });
        }
      });
    });
  };
};

tables = [{
  tableName : "table1",
  options : {
    primaryKey : "key1"
  }
},{
  tableName : "table2",
  options : {
    primaryKey : "key2"
  }
}];

new Test().createTables("test_db", tables, function(err, data) {
  console.log(err, data);
});
