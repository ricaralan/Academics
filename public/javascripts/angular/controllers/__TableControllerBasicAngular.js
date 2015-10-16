AcademicsModule.controller("__TableControllerBasicAngular", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {

	$scope.getBasics = function() {
		$http.get("/_______/get").success(function(data) {});
	};

	$scope.getById = function(id) {
		$http.get("/_______/getById/"+id).success(function(data) {});
	};

	$scope.setUpdate = function() {
		$scope.getById($routeParams.id);
	};

	$scope.create = function() {
		$http.post("/_______/create", {
			data : $scope.data
		}).success(function(data) {
			if (data.success) {
				$scope.getBasics();
			} else {
				Materialize.toast("Ocurrio un error!", 1000);
			}
		});
	};

	$scope.update = function() {
		$http.put("/_______/update", {
			data : $scope.data
		}).success(function(data) {
			if (data.success) {
				//$location.path("/");
			} else {
				Materialize.toast("Ocurrio un error!", 1000);
			}
		});
	};

	$scope.delete = function(idDelete) {
		$http.delete("/_______/delete/" + idDelete).success(function(data) {
			if (data.success) {
				$scope.getBasics();
			} else {
				Materialize.toast("Ocurrio un error!", 1000);
			}
		});
	};

}]);
