var express = require("express"),
	router = express.Router();

router.get("/", function(req, res) {
	res.render("admin");
});

router.get("/message", function(req, res) {
	res.send("consol administration");
});

module.exports = router;
