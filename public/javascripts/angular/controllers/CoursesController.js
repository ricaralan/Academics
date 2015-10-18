AcademicsModule.controller("CoursesController", ["$scope", "$http", "$routeParams", "$location", "$timeout", function($scope, $http, $routeParams, $location, $timeout) {

	$scope.course = {};

	$scope.initTabs = function() {
		$(".tabs").tabs();
	};

	$scope.changePath = function(path) {
		$location.path(path);
	};

	$scope.getCourses = function() {
		$http.get("/profile/get").success(function(data) {
			$scope.profiles = data;
		});
	};

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

	$scope.getSubCategories = function(category_id) {
		if(category_id) {
			$scope.course.category_id = category_id;	
		}
		$http.get("/sub_categories/getByCategory/" + $scope.course.category_id).success(function(sub_categories) {
			$scope.sub_categories = sub_categories;
		});
	};

	$scope.setUpdateData = function() {
		$scope.getById($routeParams.id);
	};

	$scope.getById = function(id) {
		$http.get("/courses/me/get/" + id).success(function(data) {
			$timeout(function() {
				$scope.course = data;
			}, 1);
			$scope.getSubCategories(data.category_id);
		});
	};

	$scope.createCourse = function() {
		$http.post("/courses/create", {data : {course : $scope.course}}).success(function(data) {
			if(data.success) {
				$location.path("/");
				Materialize.toast("Curso creado correctamente!", 1000);
			}
		});
	};

}]);
