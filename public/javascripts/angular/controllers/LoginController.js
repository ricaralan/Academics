AcademicsModule.controller("LoginController", ["$scope", "$http", function($scope, $http) {

	$scope.username = "";
	$scope.password = "";

	$scope.authLogin = function(successLocation) {
		$http.post("/auth/local",{
			username : $scope.username,
			password : $scope.password
		}).success(function(login) {
			if(login.success) {
				window.location = "/courses";
			} else {
				Materialize.toast("Usuario o contraseña incorrecto!", 2000);
				$scope.password = "";
			}
		});
	};

}]);
