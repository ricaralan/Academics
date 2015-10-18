var express = require("express");
	 router  = express.Router(),
	encriptation = require("./../../util/encriptation")
	userController = require("./../../database/controllers/UserController");

router.get("/", function (req, res) {
	res.render("juegos/sistema_solar");
	
});

module.exports = router;