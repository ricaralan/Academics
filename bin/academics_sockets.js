module.exports = function (server) {

	/**
	*	Init variables
	*/
	var io = require("socket.io")(server);
	var PublicationCourseModel = require("../database/models/PublicationCourseModel");

	/**
	*	Sockets
	*/
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
	
};
