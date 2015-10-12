AcademicsModule.controller("CategoryController", ["$scope", "$http", function($scope, $http) {

	$scope.category = {};
	$scope.categories = [];

	$scope.getCategories = function() {
		$http.get("/categories/get").success(function(categories) {
			$scope.categories = categories;
		});
	};

	$scope.createCategory = function() {
		$scope.category.created = new Date();
		$http.post("/categories/create", {
			category : $scope.category
		}).success(function(data) {
			if (data.success) {
				$scope.category = {};
				$scope.getCategories();
				Materialize.toast("La categoria se creo correctamente", 1000);
			} else {
				Materialize.toast("Ocurrio un error!", 1000);
			}
		});
	};

	$scope.deleteCategory = function(idDeleted) {
		$http.delete("/categories/delete/" + idDeleted).success(function(data) {
			if (data.success) {
				$scope.getCategories();
				Materialize.toast("La categoria se elimino correctamente", 1000);
			} else {
				Materialize.toast("Ocurrio un error!", 1000);
			}
		});
	};

}]);
