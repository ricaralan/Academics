AcademicsModule.config(["$routeProvider", function($routeProvider) {
	$routeProvider.
	when("/", {templateUrl : "/courses/me/get/own"}).
	when("/create", {templateUrl : "/courses/me/create"}).
	when("/update-basic-data/:id", {templateUrl : "/courses/me/update-basic-data", controller : "CoursesController"}).
	otherwise({redirectTo : "/"});
}]);