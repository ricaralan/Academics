var express = require("express");
	router  = express.Router(),
	encriptation = require("./../../util/encriptation"),
	userController = require("./../../database/controllers/__TableControllerBasicStructure");

router.get("/", function (req, res) {
	// render view index
});

router.get("/get", function (req, res) {
	// get all data
});

router.get("/getById/:id", function (req, res) {
	// implements action get data by id
});

router.get("/create", function (req, res) {
	// render view create
});

router.get("/update/:id", function (req, res) {
	// render view update
});

router.get("/show/", function (req, res) {
	// render view show data on table or other method
});

router.post("/create/", function (req, res) {
	// implements action create data
});

router.put("/update/:id", function (req, res) {
	// implements action update data by id
});

router.delete("/delete/:id", function (req, res) {
	// implements action delete data by id
});


module.exports = router;