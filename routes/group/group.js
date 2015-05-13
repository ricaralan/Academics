var express = require("express");
var router  = express.Router();
var modelGroup = require("../../database/models/group");

router.get("/", function (req , res) {
	if (req.user == null) {
		// No hay un usuario logueado
		res.render("login/login", {
			title : "login Academics"
		});
	} else {
		// Hay un usuario logueado
		res.render("academics_views/groups/", {
			title : "Academics - Grupos "
		});
		
	}
});

router.get("/idGroup", function (req , res) {
	 var idGroup = req.params.idGroup;
	 
});

router.post("/createGroup/:groupName", function (req , res){
	if (req.user != null) {
		// Existe el usuario logeado entonces se crea el Grupo
		var groupName = req.params.groupName;
		modelGroup.createNewGroup({
			"user_id_group" : req.user.user_id,
			"groupName" : groupName
		}, function (err , results) {
			res.send(results);
		});
	}
});

module.exports = router;
