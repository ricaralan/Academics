var express = require("express");
var router  = express.Router();
var CommentPublicationModel = require("../../database/models/CommentPublicationModel");

router.get("/:publication_id", function (req, res) {
	CommentPublicationModel.get(req.params.publication_id,
		function(err, comments){
			res.send(comments);
	});
});

router.post("/:publication_id/:comment_text", function (req, res) {
	if (req.user != null) {
		// Existe el usuario logueado... entonces puede comentar
		CommentPublicationModel.commentInPublish({
			"publication_id_comment" : req.params.publication_id,
			"comment_text" : req.params.comment_text,
			"user_id_comment" : req.user.user_id
		}, function  (err, results) {
			res.send(results);
		});
	}
});


module.exports = router;
