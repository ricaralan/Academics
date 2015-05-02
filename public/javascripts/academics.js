Academics = function () {};

Academics.prototype.initDropDownClass = function (e) {
	dropdown = document.getElementsByClassName("dropdown-menu");
	for (var i = 0; i < dropdown.length; i++) {
		var idInnerDown = dropdown[i].getAttribute("dropdownId");
		var innerDropdown = document.getElementById(idInnerDown);
		dropdown[i].addEventListener("focus", function () {
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
});
