$(document).ready(function(){
	function tab_clicks(){
		$("ul.tab-strip").on('click', 'li a.tab-btn', function (e) {
			e.preventDefault();
			var parentClass = $(this).parent().attr('class');
			var parentElement = $(this).parent();
			if ( parentClass != "current"){
				$('.current').removeClass('current');
				parentElement.addClass('current');
			}
		});
	}
	tab_clicks();
});