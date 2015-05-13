var app = angular.module("groups_module", []);

app.controller ("groupsController", function ($scope, $http) {
	$scope.initConf = function () {
		btncreateGroup = document.getElementById("btnCreateGroup");
		btncreateGroup.addEventListener("click", $scope.createGroup);
	};

	$scope.createGroup = function () {
		$http.post("/groups/createGroup/"+ $scope.textCreateGroup)
		.success(function (results) {
			if (results.inserted) {
				console.log(results.generated_keys[0]);
				// TODO redirect to /group/result.generated_keys[0]
			}
		});
	};

	$scope.initConf();
});