AcademicsModule.directive("appForUsers", [function() {
	return {
		restrict : "E",
		transclude : true,
		templateUrl : "/prefabs/app-for-users.html",
		link : function(scope, element, attributes) {
			scope.userPhoto = attributes.userPhoto;
			$(".button-collapse").sideNav();
		}
	}
}]);