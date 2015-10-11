AcademicsModule.controller("UserController", ["$scope", "$http", function($scope, $http) {

	$scope.formUser = {};

	$scope.createUser = function() {
		$http.post("/users/create", {user : $scope.formUser}).success(function(data) {
			console.log(data);
		});
	};

}]);