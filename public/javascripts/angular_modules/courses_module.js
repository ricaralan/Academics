var app = angular.module("courses_module", ["academics_module"]);

app.controller("coursesController", function ($scope, $http) {

	$scope.courses = [];

	$scope.initBtnCreateCourse = function () {
		btnCreateCourse = document.getElementById("btnCreateCourse");
		if (btnCreateCourse != null){
			btnCreateCourse.addEventListener("click", function() {
				btnCreateCourse.disabled = true;
				$scope.createCourse();
			});
		}
	};

	$scope.createCourse = function () {
		$http.post("/courses/createCourse/" + $scope.textCreateCourse)
		.success(function (results) {
			if (results.inserted) {
				window.location = "/courses/" + results.generated_keys[0];
			}
		});
	};

	$scope.getCoursesUser = function () {
		$http.get("/courses/get/coursesUser").success(function (courses) {
			$scope.courses = courses;
		});
	};

	$scope.deleteCourse = function (course_id) {
		var dataCourse = $scope.getCourseById(course_id);
		if (confirm("Are you sure delete course \"" + dataCourse.course.course_name + "\"")) {
			$http.delete("/courses/deleteCourse/"+ course_id)
			.success(function (data){
				if (data) {
					$scope.courses.splice(dataCourse.position, 1);
				} else {
					alert("An error ocurred...");
				}
			});
		}
	};

	$scope.getCourseById = function (course_id) {
		for (var i = 0; i < $scope.courses.length; i++) {
			if ($scope.courses[i].course_id == course_id) {
				return {
					position : i,
					course : $scope.courses[i]
				};
			}
		}
		return null;
	};

});

app.controller("publicationsCourses", function ($scope, $http) {
	
	$scope.socket = io();
	$scope.publications = [];

	$scope.publishInCourse = function () {
		if ($scope.textPublishInCourse != null){
			URL = "/publicationCourse/publish/" + $scope.course.course_id +
				  "/" + encodeURIComponent($scope.textPublishInCourse);
			$http.post(URL)
			.success(function (results) {
				if (results.inserted) {
					$scope.textPublishInCourse = "";
					console.log("Publicacion exitosa!");
				}
			});
		}
	};

	$scope.getPublications = function (sliceStart, sliceEnd) {
		URL = "/publicationCourse/" + $scope.course.course_id +
			  "/" + sliceStart + "/" + sliceEnd;
		$http.get(URL).success(function (publications){
			$scope.publications = publications;
		});
	};

	$scope.getCommentPublication = function (publication) {
		$http.get("/CommentPublication/"+publication.publication_course_id)
		.success(function (data) {
			publication.comments = data;
		});
	}

	$scope.comentarPublicacion = function (publication_id) {
		setTimeout(function () {
			inputPublication = document.getElementById("comment_pub_" + publication_id);
			inputPublication.addEventListener("keyup", function (e){
				input = this;
				if (e.keyCode == 13) {
					$http.post("/commentPublication/"+encodeURIComponent(publication_id)+
						"/"+encodeURIComponent(this.value))
						.success(function (data) {
							if (data.inserted == 1) {
								console.log("Comentario exitoso!");
								input.value = "";
							}
						});
					// TODO hacer que el input borre su contenido
				}
			});
		}, 100);
	};

	/**
	*	Init load
	*/

	// TODO ADD OPTION GET MORE PUBLICATIONS!!
	$scope.getPublications(0, 9);
	$scope.socket.on("newPublicationIn"+$scope.course.course_id, function (publication){
		$scope.$apply(function () {
			$scope.publications.unshift(publication);
		});
	});

	$scope.initSocketPublicationForComments = function (publicationId) {
		$scope.socket.on("newCommentInPublication-"+publicationId, function(comment){
			$scope.addCommentToPublication(publicationId, comment);
			content = document.getElementById("contentComments-"+publicationId);
			content.innerHTML = content.innerHTML +"<br>"+ comment[0].comment_text;
		});
	};

	$scope.addCommentToPublication = function (publicationId, comment) {
		for (var i = 0; i < $scope.publications.length; i++){
			if ($scope.publications[i].publication_course_id == publicationId) {
				$scope.$apply(function () {
					$scope.publications[i].comments.push(comment);
				});
			}
		}
	};

});

app.directive("courseContainer", function () {
	return {
		restrict : "E",
		transclude : true,
		templateUrl : "/prefab/courses/abstract/course-container.html"
	};
});

app.directive("headerContainerCourse", function () {
	return {
		restrict : "E",
		templateUrl : "/prefab/courses/abstract/header-container-course.html"
	};
});

app.directive("footerContainerCourse", function () {
	return {
		restrict : "E",
		templateUrl : "/prefab/courses/abstract/footer-container-course.html"
	};
});

app.directive("coursesContainer", function () {
	var initCoursesContainer = function (scope, element, attributes) {
		attributes.$observe("courses", function (courses) {
			//scope.courses = JSON.parse(courses);
		});
	};
	return {
		restrict : "E",
		transclude : true,
		templateUrl : "/prefab/courses/courses-container.html",
		link : initCoursesContainer
	};
});

app.directive("containerSpecificCourse", function () {
	var initCoursesContainer = function (scope, element, attributes) {
		scope.course = JSON.parse(attributes.course);
	};
	return {
		restrict : "E",
		transclude : true,
		templateUrl : "/prefab/courses/container-specific-course.html",
		link : initCoursesContainer
	};
});

