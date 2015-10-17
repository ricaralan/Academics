AcademicsModule.config(["$routeProvider", function($routeProvider) {
	$routeProvider.
	when("/", {templateUrl : "/profile/show"}).
	when("/create", {templateUrl : "/profile/create"}).
	when("/update/:id", {templateUrl : "/profile/update/:id", controller : "ProfileController"}).
	otherwise({redirectTo : "/"});
}]);