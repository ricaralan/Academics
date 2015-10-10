var InitDatabase = function() {
  /**
  * INIT PRIVATE VARIABLES
  */
  var academicsConnection = require("./../connection/AcademicsConnection"),
      self = this;
      self.dbName = "academics_db",
      self.tables = require("./tables");

  self.createDB = function(done) {
    academicsConnection.doQuery(
      academicsConnection.getR().dbCreate(self.dbName), function() {
        self.createTables(done);
      }
    );
  };

  self.createTable = function(tableName, options, done) {
    academicsConnection.doQuery(
      academicsConnection.getR().db(self.dbName).tableCreate(tableName, options), done
    );
  };

  self.createTables = function(done) {
    for(var i = 0; i < self.tables.length; i++) {
        self.createTable(self.tables[i].tableName, self.tables[i].options, done);
    }
  };
};

new InitDatabase().createDB(function(err, data) {
  console.log(err, data);
});
