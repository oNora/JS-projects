var SliderHelper = {

    // object with all vertical sliders
    swiperVerticals: {},

    initVerticalSliders: function (innerSliderSelector) {

        $('.' + innerSliderSelector).each(function (index) {

            var projectId = $(this).attr('id');
            var projectSelector = '#' + projectId;
            SliderHelper.swiperVerticals[projectId] = new Swiper(projectSelector, {
                direction: 'vertical',
                simulateTouch: false,
                spaceBetween: 2
            });
        });

    },

    moveIphoneVertical: function (index, nextIndex, direction) {

        // move iphone slider
        if (nextIndex >= 6) {
            // the number is the starting page of phone slide
            var slideIndex = nextIndex - 5;

            SliderHelper.swiperVerticals.iphoneVertical.slideTo(slideIndex, 700);
        } else if (nextIndex == 5) {
            SliderHelper.swiperVerticals.iphoneVertical.slideTo(0, 700);
        }

    },

    // save current slide index
    slideIndex: 0,

    // object with all horizontals sliders
    swiperHorizontal: {},

    initHorizontalSlide: function (innerSliderSelector) {

        $('.' + innerSliderSelector).each(function (index) {

            var projectId = $(this).attr('id');
            var projectSelector = '#' + projectId;
            SliderHelper.swiperHorizontal[projectId] = new Swiper(projectSelector, {
                simulateTouch: false,
                spaceBetween: 2,
            });
        });

    },

    calculateNewScale: function () {
        var scalePhone;
        var scaleTablet;

        if ($(window).width() < 1368) {
            scalePhone = ($(window).width() / 1220);
            scaleTablet = ($(window).width() / 1400);
        } else {
            scalePhone = 1;
            scaleTablet = 1;
        }

        $("#iphone-frame, #android-frame").css({
            "-moz-transform": "translate(-40%, -50%) scale(" + scalePhone + ")",
            "-webkit-transform": "translate(-40%, -50%) scale(" + scalePhone + ")",
            "transform": "translate(-40%, -50%) scale(" + scalePhone + ")"
        });

        $("#ipad-frame").css({
            "-moz-transform": "translate(-35%, -50%) scale(" + scaleTablet + ")",
            "-webkit-transform": "translate(-35%, -50%) scale(" + scaleTablet + ")",
            "transform": "translate(-35%, -50%) scale(" + scaleTablet + ")"
        });

    },

    moveLogo: function (slide, next, directionSlide) {

        var hash = window.location.hash;
        var loader = ('#ip-container');
        var hasLoaded;

        // only for furst page
        if (hash == '#home') {
            $(".ip-logo").slideUp();
            $(".swiper-button").css("pointer-events", "none");

        }

        // when scroll back to first page
        if (hash != '#home' && next == 1 && directionSlide == "up") {
            $(".ip-logo").slideDown();
        }

        // remove logo for pages except first after loading
        if (slide >= 1 && hash != '#home' && directionSlide == "down") {
            $(".swiper-button").css("pointer-events", "auto");
            interval = setInterval(function () {
                hasLoaded = $(loader).hasClass('loaded');

                if (hasLoaded) {
                    clearInterval(interval);
                    $(".ip-logo").slideUp();
                    $(".fp-controlArrow ").show();
                }

            }, 10);
        }
    },

    arrowStyles: function (currentSwiperHorizontal) {
        $('.swiper-button').removeClass('swiper-button-disabled');

        if (currentSwiperHorizontal.isEnd) {
            $('.swiper-button-next').addClass('swiper-button-disabled');
        };

        if (currentSwiperHorizontal.isBeginning) {
            $('.swiper-button-prev').addClass('swiper-button-disabled');
        };
    },

    changeBulletsColor: function (index, nextIndex, directio) {

        if (nextIndex == 1) {
            $('#fp-nav ul li a span').css({
                'background': '#ffffff'
            });
            $('#fp-nav ul li .fp-tooltip').css({
                'color': '#ffffff'
            });
        } else {
            $('#fp-nav ul li a span').css({
                'background': '#807e7e'
            });
            $('#fp-nav ul li .fp-tooltip').css({
                'color': '#4b4b4b'
            });
        }

    },

    lazyLoadImg: function (slideIndex) {

        var sliderSelector = 'section' + slideIndex + '_slider';
        $('#' + sliderSelector + ' .img-lazy').each(function (index) {

            var puls = $(this).data("puls");
            $(this).attr('src', $(this).data("imgsrc"))
            $('.' + puls).fadeIn(1000);

        });
    }

}

SliderHelper.calculateNewScale(); // if the user go to the page and his window is less than 1920px
$(window).resize(function () {
    SliderHelper.calculateNewScale();
});

$(document).ready(function () {

    var video = $('#videoPlayer')[0];
    document.ontouchmove = function (event) {
        event.preventDefault();
    }

    $('#fullpage').fullpage({
        anchors: ['home', 'our-approach', 'solutions', 'project-one', 'project-two', 'project-three', 'project-four', 'project-five', 'project-six'],
        navigation: true,
        css3: false,
        normalScrollElementTouchThreshold: 5,
        // scrollingSpeed: 500,
        // navigationTooltips: ['Home', 'Our approach', 'Solutions', 'Project One', 'Project Two', 'Project Three', 'Project Four', 'Project Five', 'Project six'],
        afterRender: function () {
            //init horizontal and vertical sliders
            SliderHelper.initHorizontalSlide('slide-show-projects');
            SliderHelper.initVerticalSliders('slide-show-devices');
            $(".swiper-button").css("pointer-events", "none");
            $('#iphone-frame').animate({
                'z-index': -10,
            }, 100);
        },
        onLeave: function (index, nextIndex, direction) {

            SliderHelper.moveLogo(index, nextIndex, direction);
            SliderHelper.changeBulletsColor(index, nextIndex, direction);
            SliderHelper.slideIndex = nextIndex;
            SliderHelper.lazyLoadImg(nextIndex);

            var sliderName = 'section' + SliderHelper.slideIndex + '_slider';
            if (SliderHelper.swiperHorizontal[sliderName]) {
                SliderHelper.arrowStyles(SliderHelper.swiperHorizontal[sliderName]);
            }

            // hide arrows of slider when slider has btn-pulse
            if (nextIndex == 5) {
                $('.swiper-button').css({
                    display: 'none'
                });
            } else {
                $('.swiper-button').css({
                    display: 'block'
                });
            }

            // where to show iPhone - index of sled
            if (nextIndex >= 5 && nextIndex <= 8) {

                //for smooth animation
                $('#iphone-frame').css({
                    'z-index': 10,
                });
                $('#iphone-frame').animate({
                    'opacity': 1
                });

                SliderHelper.moveIphoneVertical(index, nextIndex, direction);

            } else {

                //for smooth animation
                $('#iphone-frame').animate({
                    'opacity': 0,
                });
                $('#iphone-frame').animate({
                    'z-index': -10,
                }, 100);
            }

            // where to show Android - index of sled
            if (nextIndex == 4) {

                //for smooth animation
                $('#android-frame').css({
                    'z-index': 10,
                });
                $('#android-frame').animate({
                    'opacity': 1,
                });

            } else {

                //for smooth animation
                $('#android-frame').animate({
                    'opacity': 0
                });
                $('#android-frame').animate({
                    'z-index': -10
                }, 100);
            }

            // where to show iPad - index of sled
            if (nextIndex >= 9) {

                //for smooth animation
                $('#ipad-frame').css({
                    'z-index': 10,
                });
                $('#ipad-frame').animate({
                    'opacity': 1
                });

                // video.play();
            } else {

                //for smooth animation
                $('#ipad-frame').animate({
                    'opacity': 0
                });
                $('#ipad-frame').animate({
                    'z-index': -10
                }, 100);

                // video.pause();
            }
        }

    });

    loaderjs.init();

    $('.swiper-button-next').on('click', function () {

        var sliderName = 'section' + SliderHelper.slideIndex + '_slider';
        var nextIndex = SliderHelper.swiperHorizontal[sliderName].activeIndex + 1;
        SliderHelper.swiperHorizontal[sliderName].slideTo(nextIndex, 700, false);

        if (SliderHelper.swiperHorizontal[sliderName].isEnd) {
            $('.swiper-button-next').addClass('swiper-button-disabled');
        }

        if ($('.swiper-button-prev').hasClass('swiper-button-disabled')) {
            $('.swiper-button-prev').removeClass('swiper-button-disabled');
        }
    });

    $('.swiper-button-prev').on('click', function () {
        var sliderName = 'section' + SliderHelper.slideIndex + '_slider';
        var nextIndex = SliderHelper.swiperHorizontal[sliderName].activeIndex - 1;
        SliderHelper.swiperHorizontal[sliderName].slideTo(nextIndex, 700, false);

        if (SliderHelper.swiperHorizontal[sliderName].isBeginning) {
            $('.swiper-button-prev').addClass('swiper-button-disabled');
        }

        if ($('.swiper-button-next').hasClass('swiper-button-disabled')) {
            $('.swiper-button-next').removeClass('swiper-button-disabled');
        }

    });

    $('.btn-pulse').on('touchstart', function (e) {
        e.stopPropagation();
    });

    $('.btn-pulse').on('click', function (e) {
        var getTarget = $(this).data('target');
        var getSliderId = $(this).closest('.slide-show-projects').attr('id');

        if (getTarget == 'noTarget') {

            $('#slider-img').toggleClass("slide-in");
            $('#slider-img').toggleClass("slide-out");

        } else {
            SliderHelper.swiperHorizontal[getSliderId].slideTo(getTarget, 700, false);
        }

    });


});