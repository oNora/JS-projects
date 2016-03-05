$(document).ready( function() {
	$('.imgDiv img').on('click', function() {
		var imgPath = $(this).data('big');
		var imgText = $(this).next().text();

		$('body').append('<div id="popUp_overlay">'
							+ '<div id="img_popUp" class="alignCenterImg_blog"><div id="cancelButton"><span  class="icon-close"></span>'
							+ '</div><img src="' + imgPath + '"/><br/><br/><p class="imgText">' + imgText + '</p></div></div>');

		setTimeout( function() {
			$('#img_popUp').each( function() {
				$(this).css('left', ($(window).width() - $(this).outerWidth()) / 2 + 'px');
				$(this).css('top', ($(window).height() - $(this).outerHeight()) / 2 + 'px');
			});
			$('#img_popUp').show();
		},100);

		$('#popUp_overlay').each( function() {
			$(this).css('width', $(document).innerWidth() + 'px');
			$(this).css('height', $(document).innerHeight() - 100 + 'px');

		});
			$('body').on('click', '#cancelButton', function() {
			$('#video_popUp').remove();
			$('#popUp_overlay').remove();
		});
	});
});