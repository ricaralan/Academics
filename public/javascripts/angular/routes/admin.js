AcademicsModule.config(["$routeProvider", function($routeProvider) {
	$routeProvider.
	when("/", {templateUrl : "/_admin/message"}).
	when("/categories", {templateUrl : "/categories"}).
	when("/sub_categories", {templateUrl : "/sub_categories"}).
	otherwise({redirectTo : "/"});
}]);