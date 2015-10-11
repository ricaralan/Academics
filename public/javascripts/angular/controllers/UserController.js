AcademicsModule.controller("UserController", ["$scope", "$http", function($scope, $http) {

	$scope.formUser = {};

	$scope.createUser = function() {
		$http.post("/users/create", {user : $scope.formUser}).success(function(data) {
			if(data.success) {
				window.location = !data.emailComprobado?"/confirm_email":"/";
			} else if(data.userExist) {
				Materialize.toast("Email is occupied by someone else");
			} else {
				Materialize.toast("Ocurrio un error desconocido");
			}
		});
	};

}]);