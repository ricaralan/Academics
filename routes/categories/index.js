var express = require("express"),
	router = express.Router(),
	categoriesController = require("./../../database/controllers/CategoryController");

router.get("/", function(req, res) {
	res.render("admin/categories/");
});

router.get("/get", function(req, res) {
	categoriesController.getAll(function(err, categories) {
		res.send(categories);
	});
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

router.put("/update", function(req, res) {});

router.delete("/delete/:id", function(req, res) {
	categoriesController.delete(req.params.id, function(err, data) {
		res.send({success : !err && data.deleted === 1});
	});
});

module.exports = router;
