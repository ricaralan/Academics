AcademicsModule.controller("CoursesController", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {

	$scope.idCategory = null;

	$scope.getLanguajes = function() {
		$http.get("/languajes/get").success(function(languajes) {
			$scope.languajes = languajes;
		});
	};

	$scope.getCategories = function() {
		$http.get("/categories/get").success(function(categories) {
			$scope.categories = categories;
		});
	};

	$scope.getSubCategories = function() {
		$http.get("/sub_categories/getByCategory/" + $scope.idCategory).success(function(sub_categories) {
			$scope.sub_categories = sub_categories;
		});
	};

}]);
