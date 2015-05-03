Academics = function () {};

Academics.prototype.initDropDownClass = function (e) {
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

window.addEventListener("load", function (e) {
	new Academics().initDropDownClass();
	
	var slideout = new Slideout({
		'panel': document.getElementById('panel'),
		'menu': document.getElementById('menuLeft'),
		'padding': 256,
		'tolerance': 70
	});
	
	document.getElementById("toggle-button-left-menu")
	.addEventListener('click', function() {
        slideout.toggle();
    });
});
