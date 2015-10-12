var express = require("express"),
	router = express.Router();

router.get("/", function(req, res) {
	res.send("sub_categories");
});

router.post("/create", function(req, res) {});

router.put("/update", function(req, res) {});

router.delete("/delete", function(req, res) {});

module.exports = router;
