var express = require("express");
	router  = express.Router(),
	encriptation = require("./../../util/encriptation"),
	profileController = require("./../../database/controllers/ProfileController");

router.get("/", function (req, res) {
	// render view index
	res.render("profile");
});

router.get("/get", function (req, res) {
	// get all data
	try {
		profileController.getAll(function(err, profile) {
			res.send(profile);
		});
	} catch(e) {
		res.send({err : "Not found", data : null});
	}
});

router.get("/getById/:id", function (req, res) {
	// implements action get data by id
	try {
		profileController.getById(req.params.id, function(err, profile) {
			res.send(profile);
		});
	} catch(e) {
		res.send({err : "Not found", data : null});
	}
});

router.get("/create", function (req, res) {
	// render view create
	res.render("profile/create");
});

router.get("/update/:id", function (req, res) {
	// render view update
	res.render("profile/update");
});

router.get("/show/", function (req, res) {
	// render view show data on table or other method
	res.render("profile/showDataTable");
});

router.post("/create/", function (req, res) {
	// implements action create data
	try {
		console.log(req.body);
		profileController.insert({
			profile_name : req.body.data.profile.name,
			profile_type : req.body.data.profile.type
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
		profileController.update(req.body.data.profile_id, {
			profile_name : req.body.data.profile.profile_name,
			profile_type : req.body.data.profile.profile_type
		}, function(err, data) {
			res.send({success : !err && (data.replaced === 1 || data.unchanged === 1)});
		});
	} catch (e) {
		res.send({error : "params error"});
	}
});

router.delete("/delete/:id", function (req, res) {
	// implements action delete data by id
	profileController.delete(req.params.id, function(err, data) {
		res.send({success : !err && data.deleted === 1});
	});
});


module.exports = router;