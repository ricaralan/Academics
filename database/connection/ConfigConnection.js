/**
*	Configuration to do connection
*	@author Alan Olivares
*/
module.exports = {
	host : process.env.RDB_HOST || 'localhost',
	port : parseInt(process.env.RDB_PORT) || 28015,
	db : "academics_db"
};