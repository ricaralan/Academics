var express = require("express"),
	router = express.Router(),
	categoriesController = require("./../../database/controllers/CategoryController");

router.get("/", function(req, res) {
	res.render("admin/categories/");
});

router.get("/update", function(req, res) {
	res.render("admin/categories/update");
});

router.get("/get", function(req, res) {
	categoriesController.getAll(function(err, categories) {
		res.send(categories);
	});
});

router.get("/get/:id", function(req, res) {
	try {
		categoriesController.getById(req.params.id, function(err, category) {
			res.send(category);
		});
	} catch(e) {
		res.send({err : "Not found", data : null});
	}
});

router.post("/create", function(req, res) {
	try {
		categoriesController.insert({
			category_name : req.body.category.name,
			category_created : req.body.category.created
		}, function(err, data) {
			res.send({success : !err && data.inserted === 1});
		});
	} catch (e) {
		res.send({error : "params error"});
	}
});

router.put("/update", function(req, res) {
	try {
		categoriesController.update(req.body.category.category_id, {
			category_name : req.body.category.category_name
		}, function(err, data) {
			res.send({success : !err && (data.replaced === 1 || data.unchanged === 1)});
		});
	} catch (e) {
		res.send({error : "params error"});
	}
});

router.delete("/delete/:id", function(req, res) {
	categoriesController.delete(req.params.id, function(err, data) {
		res.send({success : !err && data.deleted === 1});
	});
});

module.exports = router;
