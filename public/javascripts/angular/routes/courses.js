AcademicsModule.config(["$routeProvider", function($routeProvider) {
	$routeProvider.
	when("/", {templateUrl : "/courses/showAllCourses"}).
	when("/own", {templateUrl : "/courses/me/get/own"}).
	when("/games", {templateUrl : "/games/view"}).
	when("/create", {templateUrl : "/courses/me/create"}).
	when("/update-basic-data/:id", {templateUrl : "/courses/update-basic-data", controller : "CoursesController"}).
	otherwise({redirectTo : "/"});
}]);