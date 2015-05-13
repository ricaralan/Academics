var app = angular.module("groups_module", []);

app.controller ("groupsController", function ($scope, $http) {
	$scope.initConf = function () {
		btncreateGroup = document.getElementById("btnCreateGroup");
		btncreateGroup.addEventListener("click", $scope.createGroup);
	};

	$scope.createGroup = function () {
		alert("I would like sleep" + $scope.textCreateGroup);
		$http.post("URL").success(function (datos) {
			console.log(datos);
		});
	};

	$scope.initConf();
});