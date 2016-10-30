function sliderScript() {
	var item_width = $('#slides li').outerWidth(true) * 3 ; 

	$('#prev').click(function() {       
		var left_indent = parseInt($('#slides ul').css('left')) + item_width;

		if (left_indent <= 0) {          
			$('#slides ul').animate({'left' : left_indent}, 200,function() {
				$('#slides ul').css({'left' : left_indent});
			});
		}
		return false;
	});


	$('#next').click(function() {
		var left_indent = parseInt($('#slides ul').css('left')) - item_width;

		if (left_indent > -1251) {
			$('#slides ul').animate({'left' : left_indent}, 200, function () {
				$('#slides ul').css({'left' : left_indent});
			});
		}
		return false;
	});
}

$(document).ready(function() {
	var sliderInfo;

	$.getJSON('scripts/slider.json', function(data) {
		sliderInfo = data;
	}).done(function() {
		var carInfo,
			sliderStructure = '';

		for (carInfo in sliderInfo) {
			sliderStructure += '<li class="carInfo"><a href="' + sliderInfo[carInfo].url + '" target="_blank">\
								<img src="' + sliderInfo[carInfo].img + '" /><span class="priceWrapper"><span class="triangle">\
								</span><span class="price">' + sliderInfo[carInfo].price + '</span></span></a></li>';
		}
		$("#slides ul").html(sliderStructure);
		sliderScript();

	}).fail(function() {
		console.log( "error" );
		var errorLI = '<li class="errorLi">Can NOT load JSON or it\'s NOT run under LOCALHOST</li>';
		$("#slides ul").html(errorLI)
	});
});