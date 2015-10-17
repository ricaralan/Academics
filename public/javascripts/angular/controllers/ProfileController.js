AcademicsModule.controller("ProfileController", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {

	$scope.getProfiles = function() {
		$http.get("/profile/get").success(function(data) {
			$scope.profiles = data;
		});
	};

	$scope.getById = function(id) {
		$http.get("/profile/getById/"+id).success(function(data) {
			$scope.profile = data;
		});
	};

	$scope.setProfileUpdate = function() {
		$scope.getById($routeParams.id);
	};

	$scope.createProfile = function() {
		$http.post("/profile/create", {
			data : {profile : $scope.profile}
		}).success(function(data) {
			if (data.success) {
				$location.path("/");
				Materialize.toast("Perfil creado correctamente!", 1000);
			} else {
				Materialize.toast("Ocurrio un error!", 1000);
			}
		});
	};

	$scope.updateProfile = function() {
		$http.put("/profile/update", {
			data : {
				profile : $scope.profile,
				profile_id : $scope.profile.profile_id
			}
		}).success(function(data) {
			if (data.success) {
				Materialize.toast("Perfil actualizado correctamente!", 1000);
				$location.path("/");
			} else {
				Materialize.toast("Ocurrio un error!", 1000);
			}
		});
	};

	$scope.delete = function(idDelete) {
		$http.delete("/profile/delete/" + idDelete).success(function(data) {
			if (data.success) {
				$scope.getBasics();
			} else {
				Materialize.toast("Ocurrio un error!", 1000);
			}
		});
	};

}]);
