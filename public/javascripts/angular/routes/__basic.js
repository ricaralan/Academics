AcademicsModule.config(["$routeProvider", function($routeProvider) {
	$routeProvider.
	when("/", {templateUrl : "/route/"}).
	when("/create", {templateUrl : "/route/create"}).
	when("/update/:id", {templateUrl : "/route/update/:id", controller : ""}).
	otherwise({redirectTo : "/"});
}]);