var express = require("express");
	 router  = express.Router(),
	encriptation = require("./../../util/encriptation")
	userController = require("./../../database/controllers/UserController");

router.get("/", function (req, res) {
	res.render("juegos/sistema_solar");
	
});

router.get("/view", function (req, res) {
	res.render("juegos/sistema_solar/view");
});

module.exports = router;