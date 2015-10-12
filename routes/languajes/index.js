var express = require("express"),
	router = express.Router(),
	languajeController = require("./../../database/controllers/LanguajeController");

router.get("/", function(req, res) {
	res.render("admin/languaje");
});

router.get("/update", function(req, res) {
	res.render("admin/languaje/update");
});

router.get("/get/", function(req, res) {
	try {
		languajeController.getAll(function(err, languajes) {
			res.send(languajes);
		});
	} catch(e) {
		res.send({err : "Not found", data : null});
	}
});

router.get("/get/:id", function(req, res) {
	try {
		languajeController.getById(req.params.id, function(err, languaje) {
			res.send(languaje);
		});
	} catch(e) {
		res.send({err : "Not found", data : null});
	}
});

router.post("/create", function(req, res) {
	try {
		languajeController.insert({
			languaje_id : req.body.languaje.id,
			languaje_name : req.body.languaje.name
		}, function(err, data) {
			res.send({success : !err && data.inserted === 1});
		});
	} catch (e) {
		res.send({error : "params error"});
	}
});

router.put("/update", function(req, res) {
	try {
		languajeController.update(req.body.languaje.languaje_id, {
			languaje_name : req.body.languaje.languaje_name,
			languaje_id : req.body.languaje.languaje_id
		}, function(err, data) {
			res.send({success : !err && (data.replaced === 1 || data.unchanged === 1)});
		});
	} catch (e) {
		res.send({error : "params error"});
	}
});

router.delete("/delete/:id", function(req, res) {
	languajeController.delete(req.params.id, function(err, data) {
		res.send({success : !err && data.deleted === 1});
	});
});

module.exports = router;
