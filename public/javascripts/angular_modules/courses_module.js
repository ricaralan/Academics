var app = angular.module("courses_module", ["academics_module"]);

app.controller("coursesController", function ($scope, $http) {

	$scope.initConf = function () {
		btnCreateCourse = document.getElementById("btnCreateCourse");
		btnCreateCourse.addEventListener("click", $scope.createCourse);
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

app.directive("courseContainer", function () {
	/*var initCourseContainer = function (scope, element, attributes) {
		attributes.$observe("cursos", function (cursos) {
			scope.cursos = JSON.parse(cursos);
		});
	};*/
	return {
		restrict : "E",
		transclude : true,
		templateUrl : "/prefab/courses/abstract/course-container.html"
		//link : initCourseContainer
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

/*
app.directive("menu", function() {
	var linkFunction = function(scope, element, attributes) {
	    attributes.$observe("atributo", function (value) {
	    	scope.atributo = value*4;
	    });
	  };
	return {
		restrict : "E",
		template: "<p>{{text}} {{atributo}}</p>",
	    link: linkFunction
	};
});

app.directive("topNavAcademics", function () {
	var linkFunction = function(scope, element, attributes) {
		attributes.$observe("name", function(name) {
			scope.name = name;
		});
	};
	return {
		restrict : "E",
		transclude: true,
		templateUrl : "/prefab/top_nav.html",
		link : linkFunction
	};
});
*/