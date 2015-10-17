AcademicsModule.controller("LevelController", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {

	$scope.getLevels = function() {
		$http.get("/level/get").success(function(data) {
			$scope.levels = data;
		});
	};

	$scope.getById = function(id) {
		$http.get("/level/getById/"+id).success(function(data) {
			$scope.level = data;
		});
	};

	$scope.setLevelUpdate = function() {
		$scope.getById($routeParams.id);
	};

	$scope.createLevel = function() {
		$http.post("/level/create", {
			data : {level : $scope.level}
		}).success(function(data) {
			if (data.success) {
				$location.path("/");
				Materialize.toast("Nivel creado correctamente!", 1000);
			} else {
				Materialize.toast("Ocurrio un error!", 1000);
			}
		});
	};

	$scope.updateLevel = function() {
		$http.put("/level/update", {
			data : {
				level : $scope.level,
				level_id : $scope.level.level_id
			}
		}).success(function(data) {
			if (data.success) {
				Materialize.toast("Nivel actualizado correctamente!", 1000);
				$location.path("/");
			} else {
				Materialize.toast("Ocurrio un error!", 1000);
			}
		});
	};

	$scope.delete = function(idDelete) {
		$http.delete("/level/delete/" + idDelete).success(function(data) {
			if (data.success) {
				$scope.getBasics();
			} else {
				Materialize.toast("Ocurrio un error!", 1000);
			}
		});
	};

}]);
