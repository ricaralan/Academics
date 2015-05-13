var app = angular.module("courses_module", []);

app.controller("coursesController", function ($scope, $http) {

	$scope.initConf = function () {
		btnCreateCourse = document.getElementById("btnCreateCourse");
		btnCreateCourse.addEventListener("click", $scope.createCourse);
	};

	$scope.createCourse = function () {
		alert("create curse " + $scope.textCreateCourse);
		$http.post("URL").success(function (datos) {
			console.log(datos);
		});
	};

	$scope.initConf();
});
