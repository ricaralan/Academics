AcademicsModule.directive("appForExternalUsers", [function() {
	return {
		restrict : "E",
		transclude : true,
		templateUrl : "/prefabs/app-for-external-users.html"
	};
}]);