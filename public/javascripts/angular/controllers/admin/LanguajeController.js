AcademicsModule.controller("LanguajeController", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {

	$scope.languaje = {};
	$scope.languajes = [];

	$scope.getLanguajes = function() {
		$http.get("/languajes/get").success(function(languajes) {
			$scope.languajes = languajes;
		});
	};

	$scope.createLanguaje = function() {
		$http.post("/languajes/create", {
			languaje : $scope.languaje
		}).success(function(data) {
			if (data.success) {
				$scope.languaje = {};
				$scope.getLanguajes();
				Materialize.toast("El lenguaje se creo correctamente", 1000);
			} else {
				Materialize.toast("Ocurrio un error!", 1000);
			}
		});
	};

}]);
