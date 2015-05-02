Academics = function () {};

Academics.prototype.initDropDownClass = function () {
	dropdown = document.getElementsByClassName("dropdown-menu");
	for (var i = 0; i < dropdown.length; i++) {
		dropdown[i].addEventListener("click", function () {
			idInnerDown = this.getAttribute("dropdownId");
			innerDropdown = document.getElementById(idInnerDown);
			setTimeout(function(){

			innerDropdown.style.display = "block";
			console.log("hide/show");
			}, 100);
		});
	}
};

window.addEventListener("load", function (e) {
	new Academics().initDropDownClass();
});
