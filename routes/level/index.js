var express = require("express");
	router  = express.Router(),
	encriptation = require("./../../util/encriptation"),
	levelController = require("./../../database/controllers/LevelController");

router.get("/", function (req, res) {
	// render view index
	res.render("level");
});

router.get("/get", function (req, res) {
	// get all data
	try {
		levelController.getAll(function(err, level) {
			res.send(level);
		});
	} catch(e) {
		res.send({err : "Not found", data : null});
	}
});

router.get("/getById/:id", function (req, res) {
	// implements action get data by id
	try {
		levelController.getById(req.params.id, function(err, level) {
			res.send(level);
		});
	} catch(e) {
		res.send({err : "Not found", data : null});
	}
});

router.get("/create", function (req, res) {
	// render view create
	res.render("level/create");
});

router.get("/update/:id", function (req, res) {
	// render view update
	res.render("level/update");
});

router.get("/show/", function (req, res) {
	// render view show data on table or other method
	res.render("level/showDataTable");
});

router.post("/create/", function (req, res) {
	// implements action create data
	try {
		console.log(req.body);
		levelController.insert({
			level_name : req.body.data.level.name
		}, function(err, data) {
			res.send({success : !err && data.inserted === 1});
		});
	} catch (e) {
		res.send({error : "params error"});
	}
});

router.put("/update/", function (req, res) {
	// implements action update data by id
	try {
		levelController.update(req.body.data.level_id, {
			level_name : req.body.data.level.level_name
		}, function(err, data) {
			res.send({success : !err && (data.replaced === 1 || data.unchanged === 1)});
		});
	} catch (e) {
		res.send({error : "params error"});
	}
});

router.delete("/delete/:id", function (req, res) {
	// implements action delete data by id
	levelController.delete(req.params.id, function(err, data) {
		res.send({success : !err && data.deleted === 1});
	});
});


module.exports = router;