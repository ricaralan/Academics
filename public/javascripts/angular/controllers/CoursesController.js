AcademicsModule.controller("CoursesController", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {

	$scope.course = {};

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
		$http.get("/sub_categories/getByCategory/" + $scope.course.category_id).success(function(sub_categories) {
			$scope.sub_categories = sub_categories;
		});
	};

	$scope.createCourse = function() {
		$http.post("/courses/create", {data : {course : $scope.course}}).success(function(data) {
			console.log(data);
		});
	};

}]);
