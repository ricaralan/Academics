var academics_module = angular.module("academics_module", []);

academics_module.controller("academics_controller", function ($scope, $http){
	
	$scope.touchstartValueX = 0;
	$scope.touchactualValueX = 0;
	$scope.touchendValueX = 0;

	$scope.initToggleButton = function () {
		button = document.getElementById("toggle-button-left-menu");
		button.addEventListener("click", function () {
			content = document.getElementById("academics-main-content");
				if (content.className != ("academics-main-content-on")){
					content.className = "academics-main-content-on";
				} else {
					content.className = "academics-main-content-off";
				}
		});
	};

	$scope.initTouchSlideMenuLeft = function () {

		content = document.getElementById("academics-main-content");

		content.addEventListener("touchstart", function(evt){
			$scope.touchstartValueX = evt.touches[0].clientX;
			$scope.touchactualValueX = 10;
		});

		content.addEventListener("touchmove", function(evt){
			translateX = evt.touches[0].clientX;
			$scope.touchactualValueX = translateX - $scope.touchstartValueX;
			if (translateX > 0 && $scope.touchactualValueX > 0 && 
				($scope.touchactualValueX < 257|| ($scope.touchstartValueX < translateX))){
				content.style.transform = "translateX("+$scope.touchactualValueX+"px)";
			}
			$scope.touchendValueX = translateX;
		});

		content.addEventListener("touchend", function(evt){
			content = document.getElementById("academics-main-content");
			if ( $scope.touchstartValueX > $scope.touchendValueX) {
				content.style.transform = "translateX(0px)";
			} else {
				content.style.transform = "translateX(257px)";
			}
		});
	};

	$scope.initToggleTopMenu = function () {
		dropdown = document.getElementsByClassName("dropdown-menu");
		for (var i = 0; i < dropdown.length; i++) {
			var idInnerDown = dropdown[i].getAttribute("dropdownId");
			var innerDropdown = document.getElementById(idInnerDown);
			dropdown[i].addEventListener("click", function () {
				innerDropdown.style.display = "block";
			});
			dropdown[i].addEventListener("focusout", function () {
				setTimeout(function () {
					innerDropdown.style.display = "none";
				}, 200)
			});
		}
		return false;
	};
	
	$scope.initToggleLeftMenu = function(){
		$scope.initToggleButton();
		$scope.initTouchSlideMenuLeft();
	};

});

academics_module.directive("allAcademicsContent", function () {
	return {
		restrict : "E",
		transclude : true,
		templateUrl : "/prefab/abstract/all-academics-content.html"
	};
});

academics_module.directive("leftMenuBehindAll", function () {
	return {
		restrict : "E",
		transclude : true,
		templateUrl : "/prefab/abstract/left-menu-behind-all.html"
	};
});

academics_module.directive("academicsMainContent", function () {
	return {
		restrict : "E",
		transclude : true,
		templateUrl : "/prefab/abstract/academics-main-content.html"
	};
});

academics_module.directive("academicsTopMenu", function () {
	return {
		restrict : "E",
		transclude : true,
		templateUrl : "/prefab/abstract/academics-top-menu.html"
	};
});

academics_module.directive("academicsContentTopMenu", function () {
	return {
		restrict : "E",
		transclude : true,
		templateUrl : "/prefab/abstract/academics-content-top-menu.html"
	};
});

academics_module.directive("appForUsersAcademics", function () {
	var initLink = function (scope, element, attributes) {
		scope.userPhoto = attributes.userPhoto;
	};
	return {
		restrict : "E",
		transclude : true,
		templateUrl : "/prefab/app-for-users-academics.html",
		link : initLink
	};
});

academics_module.directive("appForExternalUsers", function () {
	return {
		restrict : "E",
		transclude : true,
		templateUrl : "/prefab/app-for-external-users.html"
	};
});
