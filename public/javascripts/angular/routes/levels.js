AcademicsModule.config(["$routeProvider", function($routeProvider) {
	$routeProvider.
	when("/", {templateUrl : "/level/show"}).
	when("/create", {templateUrl : "/level/create"}).
	when("/update/:id", {templateUrl : "/level/update/:id", controller : "LevelController"}).
	otherwise({redirectTo : "/"});
}]);