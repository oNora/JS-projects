window.onload = function(){
	var linkElements = document.getElementsByTagName("a");
	for (var i = 0; i < linkElements.length; i++) {
		linkElements[i].onclick = function(e) {
			window.open(
				this.href,
				"_blank",
				"scrollbars=no,width=300,height=280,resizable=yes"
			);
			e? e.preventDefault() : (window.event.returnValue = false);
		};
	}
};