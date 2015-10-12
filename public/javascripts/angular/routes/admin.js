AcademicsModule.config(["$routeProvider", function($routeProvider) {
	$routeProvider.
	when("/", {templateUrl : "/_admin/message"}).
	when("/categories", {templateUrl : "/categories"}).
	when("/categories/update/:id", {templateUrl : "/categories/update", controller : "CategoryController"}).
	when("/sub_categories", {templateUrl : "/sub_categories"}).
	when("/sub_categories/update/:id", {templateUrl : "/sub_categories/update", controller : "SubCategoryController"}).
	otherwise({redirectTo : "/"});
}]);