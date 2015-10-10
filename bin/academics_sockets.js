module.exports = function (server) {

	/**
	*	Init variables
	*/
	var io = require("socket.io")(server);
	var PublicationCourseModel = null;//require("../database/models/PublicationCourseModel");
	var CommentPublicationModel = null;//require("../database/models/CommentPublicationModel");

	/**
	*	Sockets
	
	PublicationCourseModel.changes(function (err, cursor){
	  cursor.each(function (err, publication){
	    if (publication.new_val != null) {
	      PublicationCourseModel.get(publication.new_val.publication_course_id,
	        function (err, publication) {
	        io.emit(
	          "newPublicationIn"+publication.course_id_publish,
	          publication
	          );
	      })
	    } else {
	    	
	    }
	  });
	});

	CommentPublicationModel.changes(function (err, cursor){
		cursor.each(function (err, comment){
			if (comment.new_val != null) {
				/*
					EXAMPLE:
					{ 
					  	new_val: { 
					  		// Id del nuevo comentario
							comment_publication_id: '9dc193de-1a4b-40e3-8c7f-2db775bc0ac7',
						    comment_text: 'krjgnerkg',
						    // Publicacion en la que se hizo!
						    publication_id_comment: 'dd074f78-86fe-4b25-9015-a8f5cd65e579',
						    // Quien lo comento
						    user_id_comment: '807847965989128'
						},
					  	old_val: null 
					}
				
				CommentPublicationModel.getDataSpecificComment(
						comment.new_val.publication_id_comment,
						comment.new_val.comment_publication_id,
						function(err, dataComment){
							io.emit(
								"newCommentInPublication-"+
								comment.new_val.publication_id_comment,
								dataComment
								);
						});
			}
		});
	});
	*/
};
