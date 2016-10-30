$(document).ready(function () {
	var sliderElements = '<li><div style="background:#980000;"></div></li>\
							<li><div style="background:#ff8a00;"></div></li>\
							<li><div style="background:#a1a1a1;"></div></li>'
	$('.bannerScript ul').append(sliderElements);

	//  counting the number of click over "see more" button
	var  count = 0;

	// check if slide's elements are less than 5 to work smooth
	if( (count === 0) && ($('li').length < 5)){
		$('.bannerScript li:first').before(sliderElements);
		count = 1;
	} else {
		count = 1;
	}



	var item_height = $('.bannerScript li').outerHeight();
	var top_value = item_height * (-1); 


	//move the last item before first item, just in case user click prev button
	$('.bannerScript li:first').before($('.bannerScript li:last'));

	$('.bannerScript ul').css({'top' : top_value});

	$('.arrowDown').click(function() {
		var top_indent = parseInt($('.bannerScript ul').css('top')) + item_height;

			$('.bannerScript ul').animate({'top' : top_indent}, 500,function(){
				$('.bannerScript li:first').before($('.bannerScript li:last'));
				$('.bannerScript ul').css({'top' : top_value});

			});

		return false;

	});

	$('.arrowUp').click(function() {

		var top_indent = parseInt($('.bannerScript ul').css('top')) - item_height;

			$('.bannerScript ul').animate({'top' : top_indent}, 500, function () {
				$('.bannerScript li:last').after($('.bannerScript li:first'));
				$('.bannerScript ul').css({'top' : top_value});

			});

		return false;

	});

	$('.buttonsWrapper .seeMore').click(function() {

		var newBannerHeight = $('#banner').outerHeight() + 230;
		var newBannerUlHeight = $('.bannerScript').outerHeight() + 230;
		count++;		
		$('#banner').css("height", newBannerHeight);
		$('.bannerScript').css("height", newBannerUlHeight);
		if (count ===  3) {
			console.log("rabnoe na 2");
			$('.seeMore').hide();
		}
	});

	$('.bannerScript .closeButton').click(function() {
		if (count > 1) {
			$('#banner').css("height", '257px');
			$('.bannerScript').css("height", '230px');
			$('.seeMore').show();
			$('.bannerScript ul').css({'top' : '-230px'});
			count = 1;
		}
	});

});