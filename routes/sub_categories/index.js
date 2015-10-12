var express = require("express"),
	router = express.Router(),
	subCategoryController = require("./../../database/controllers/SubCategoryController");

router.get("/", function(req, res) {
	res.render("admin/sub_categories");
});

router.get("/get", function(req, res) {
	subCategoryController.getAll(function(err, sub_categories) {
		res.send(sub_categories);
	});
});

router.post("/create", function(req, res) {
	try {
		subCategoryController.insert({
			sub_category_name : req.body.sub_category.name,
			category_id : req.body.sub_category.category_id,
			sub_category_created : req.body.sub_category.created
		}, function(err, data) {
			res.send({success : !err && data.inserted === 1});
		});
	} catch (e) {
		res.send({error : "params error"});
	}
});

router.put("/update", function(req, res) {});

router.delete("/delete", function(req, res) {});

module.exports = router;
