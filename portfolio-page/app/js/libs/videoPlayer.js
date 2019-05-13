;
(function () {

	'use strict';

	var bodyEl = document.body,
		videoWrap = document.querySelector('.video-wrap'),
		videoEl = videoWrap.querySelector('.video-player'),
		playCtrl = document.querySelector('.action--play'),
		closeCtrl = document.querySelector('.action--close'),
		playImg = document.querySelector('.deco-stack__img');

	$('.deco-stack__img, .action--play').hover(function () {
		$(".deco-stack__img").attr('src', './images/video/lamb2.png');
		$(".action--play").css({
			"color": "#FFBF00",
			"border-color": "#FFBF00"
		});
	}, function () {
		$(".deco-stack__img").attr('src', './images/video/lamb.png');
		$(".action--play").css({
			"color": "white",
			"border-color": "white"
		});
	});

	$(playCtrl).on("click", function () {
		next();
	});

	$(playImg).on("click", function () {
		next();
	});


	function next() {
		videoEl.setAttribute('src', "images/video/meet-the-team.mp4");
		$(videoEl).css("display", "initial");
		$(".loader").show();
		closeCtrl.addEventListener('click', hide);
		videoEl.addEventListener('ended', hide);
		$(videoEl).load();
		initEvents();
	}


	function initEvents() {
		videoEl.onloadstart = function () {
			play();
		};
		videoEl.onplay = function () {
			$(".loader").hide();
		};
	}



	function play() {
		videoEl.setAttribute('poster', "images/video/poster.png");
		videoEl.currentTime = 0;
		classie.remove(videoWrap, 'video-wrap--hide');
		classie.add(videoWrap, 'video-wrap--show');
		setTimeout(function () {
			videoEl.play();
		}, 1000);
		setTimeout(function () {
			$(".deco-stack__img").attr('src', './images/video/lamb.png');
			$(".action--play").css({
				"color": "white",
				"border-color": "white"
			});
		}, 2000);

		$.fn.fullpage.setMouseWheelScrolling(false);
		$.fn.fullpage.setAllowScrolling(false);
		$.fn.fullpage.setAllowScrolling(false, 'up, down');
		$.fn.fullpage.setKeyboardScrolling(false, 'up, down');

	}

	function hide() {
		classie.remove(videoWrap, 'video-wrap--show');
		classie.add(videoWrap, 'video-wrap--hide');
		videoEl.pause();
		$.fn.fullpage.setMouseWheelScrolling(true);
		$.fn.fullpage.setAllowScrolling(true);
		$.fn.fullpage.setAllowScrolling(true, 'up, down');
		$.fn.fullpage.setKeyboardScrolling(true, 'up, down');
	}




})();