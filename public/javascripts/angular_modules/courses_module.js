var app = angular.module("courses_module", []);

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
