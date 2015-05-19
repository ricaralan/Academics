var app = angular.module("courses_module", ["academics_module"]);

app.controller("coursesController", function ($scope, $http) {

	$scope.publications = [];

	$scope.initConf = function () {
		btnCreateCourse = document.getElementById("btnCreateCourse");
		if (btnCreateCourse != null){
			btnCreateCourse.addEventListener("click", $scope.createCourse);
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

	$scope.initConf();
});

app.controller("publicationsCourses", function ($scope, $http) {
	
	$scope.publishInCourse = function () {
		URL = "/publicationCourse/publish/" + $scope.course.course_id +
			  "/" + encodeURIComponent($scope.textPublishInCourse);
		$http.post(URL)
		.success(function (results) {
			if (results.inserted) {
				console.log("Publicacion exitosa!");
			}
		});
	};

	$scope.getPublications = function (sliceStart, sliceEnd) {
		URL = "/publicationCourse/" + $scope.course.course_id +
			  "/" + sliceStart + "/" + sliceEnd;
		$http.get(URL).success(function (publications){
			$scope.publications = publications;
		});
	};
	
	$scope.getPublications(0, 5);

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
			scope.courses = JSON.parse(courses);
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

