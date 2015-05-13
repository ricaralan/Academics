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
