var express = require("express"),
	router = express.Router(),
	subCategoryController = require("./../../../database/controllers/SubCategoryController");

router.get("/", function(req, res) {
	res.render("admin/sub_categories");
});

router.get("/update", function(req, res) {
	res.render("admin/sub_categories/update");
});

router.get("/getByCategory/:id_category", function(req, res) {
	subCategoryController.getSubCategoriesByCategory(req.params.id_category, function(err, sub_categories) {
		res.send(sub_categories);
	});
});

router.get("/get/:id", function(req, res) {
	try {
		subCategoryController.getById(req.params.id, function(err, sub_category) {
			res.send(sub_category);
		});
	} catch(e) {
		res.send({err : "Not found", data : null});
	}
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

router.put("/update", function(req, res) {
	try {
		subCategoryController.update(req.body.sub_category.sub_category_id, {
			sub_category_name : req.body.sub_category.sub_category_name,
			category_id : req.body.sub_category.category_id
		}, function(err, data) {
			res.send({success : !err && (data.replaced === 1 || data.unchanged === 1)});
		});
	} catch (e) {
		res.send({error : "params error"});
	}
});

router.delete("/delete/:id", function(req, res) {
	subCategoryController.delete(req.params.id, function(err, data) {
		res.send({success : !err && data.deleted === 1});
	});
});

module.exports = router;
