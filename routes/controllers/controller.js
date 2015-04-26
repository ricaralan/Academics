var express = require("express");
var router  = express.Router();
var FirstModel = require("./../../database/models/FirstModel");

var modelUser = new FirstModel("usuario");

router.get("/", function(req, res){
	res.send("hello rethinkdb");
	console.log(
		modelUser.insert({"id_usuario":29,"usuario" : "usuario"})
		);
});

module.exports = router;