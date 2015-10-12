AcademicsModule.controller("LanguajeController", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {

	$scope.languaje = {};
	$scope.languajes = [];
	$scope.languaje_update = {};

	$scope.getLanguajes = function() {
		$http.get("/languajes/get").success(function(languajes) {
			$scope.languajes = languajes;
		});
	};

	$scope.setLanguajeUpdate = function() {
		$scope.getById($routeParams.id);
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

	$scope.updateLanguaje = function() {
		$http.put("/languajes/update", {
			languaje : $scope.languaje_update
		}).success(function(data) {
			if (data.success) {
				$location.path("languajes");
				Materialize.toast("El lenguaje se edito correctamente", 1000);
			} else {
				Materialize.toast("Ocurrio un error!", 1000);
			}
		});
	};

	$scope.deleteLanguaje = function(idDelete) {
		$http.delete("/languajes/delete/" + idDelete).success(function(data) {
			if (data.success) {
				$scope.getLanguajes();
				Materialize.toast("El lenguaje se elimino correctamente", 1000);
			} else {
				Materialize.toast("Ocurrio un error!", 1000);
			}
		});
	};

	$scope.getById = function(id) {
		$http.get("/languajes/get/"+id).success(function(languaje) {
			$scope.languaje_update = languaje;
		});
	};

}]);
