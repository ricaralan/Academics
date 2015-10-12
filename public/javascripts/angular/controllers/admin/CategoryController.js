AcademicsModule.controller("CategoryController", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {


	$scope.category = {};
	$scope.category_update = {};
	$scope.categories = [];

	$scope.getCategories = function() {
		$http.get("/categories/get").success(function(categories) {
			$scope.categories = categories;
		});
	};

	$scope.setCategoryUpdate = function() {
		$scope.getById($routeParams.id);
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

	$scope.updateCategory = function() {
		$http.put("/categories/update", {
			category : $scope.category_update
		}).success(function(data) {
			if (data.success) {
				$location.path("categories");
				Materialize.toast("La categoria se edito correctamente", 1000);
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

	$scope.getById = function(id) {
		$http.get("/categories/get/"+id).success(function(category) {
			$scope.category_update = category;
		});
	};

}]);
