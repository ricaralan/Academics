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

Academics.prototype.slideoutToggle = function (slideout, button) {
	modal = document.getElementById("panelModal");
	if ( !slideout._opened ) {
		slideout.open();
		modal.style.display = "block";
		button.className = "fa fa-close";
	}else {
		slideout.close();
		modal.style.display = "none";
		button.className = "fa fa-bars";
	}
};

window.addEventListener("load", function (e) {
	new Academics().initDropDownClass();
	
	var slideout = new Slideout({
		'panel': document.getElementById('panel'),
		'menu': document.getElementById('menuLeft'),
		'padding': 256,
		'tolerance': 70
	});
	
	var toggeButtonLeftMenu = document.getElementById("toggle-button-left-menu");
	toggeButtonLeftMenu.addEventListener('click', function() {
        new Academics().slideoutToggle(slideout, toggeButtonLeftMenu);
    });
});
