AcademicsModule.controller("SubCategoryController", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {


	$scope.sub_category = {};
	$scope.sub_category_update = {};
	$scope.sub_categories = [];
	$scope.categories = [];

	$scope.getCategories = function() {
		$http.get("/categories/get").success(function(categories) {
			$scope.categories = categories;
		});
	};

	$scope.getSubCategories = function() {
		$http.get("/sub_categories/get").success(function(sub_categories) {
			$scope.sub_categories = sub_categories;
		});
	};

	$scope.createSubCategory = function() {
		$scope.sub_category.created = new Date();
		$http.post("/sub_categories/create", {
			sub_category : $scope.sub_category
		}).success(function(data) {
			if (data.success) {
				$scope.category = {};
				$scope.getSubCategories();
				Materialize.toast("La sub-categoria se creo correctamente", 1000);
			} else {
				Materialize.toast("Ocurrio un error!", 1000);
			}
		});
	};

}]);
