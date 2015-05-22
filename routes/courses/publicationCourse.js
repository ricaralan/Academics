var express = require("express");
var router  = express.Router();
var CommentPublicationModel = require("../../database/models/CommentPublicationModel");
var PublicationCourseModel = require("../../database/models/PublicationCourseModel");

router.get("/:course_id/:sliceStart/:sliceEnd", function (req, res) {
	var sliceStart = req.params.sliceStart;
	var sliceEnd   = req.params.sliceEnd;
	PublicationCourseModel.getCoursesSlice(
		{course_id_publish : req.params.course_id}, parseInt(sliceStart), parseInt(sliceEnd),
		function (err, publications) {
			res.send(publications);
	});
});

function getJoinJsons(json1, json2){
	json = {};
	copyJson(json, json1);
	copyJson(json, json2);
	return json
}

function copyJson(jsonTemp, json){
	for (var key in json){
		jsonTemp[key] = json[key];
	}
}

router.post("/publish/:course_id/:publication_text", function (req, res) {
	if (req.user != null) {
		// Existe el usuario logueado... entonces se puede publicar
		var course_id = req.params.course_id;
		var publication_text = req.params.publication_text;
		PublicationCourseModel.publishInCourse({
			"user_id_publish" : req.user.user_id,
			"publication_text" : publication_text,
			"course_id_publish" : course_id
		}, function  (err, results) {
			res.send(results);
		});
	}
});

module.exports = router;
