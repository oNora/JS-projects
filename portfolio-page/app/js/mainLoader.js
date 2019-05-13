var loaderjs;
(function () {
    var val1 = 0.9;
    var val2 = 0.01;
    $(window).on('load', function() {
        val1 = 1;
        val2 = 0.2;
    });

    var support = { animations: Modernizr.cssanimations },
        container = document.getElementById('ip-container'),
        header = container.querySelector('header.ip-header'),
        loader = new PathLoader(document.getElementById('ip-loader-circle')),
        animEndEventNames = { 'WebkitAnimation': 'webkitAnimationEnd', 'OAnimation': 'oAnimationEnd', 'msAnimation': 'MSAnimationEnd', 'animation': 'animationend' },
        // animation end event name
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];

    function init() {
        var onEndInitialAnimation = function() {
            if (support.animations) {
                this.removeEventListener(animEndEventName, onEndInitialAnimation);
            }

            startLoading();

        };

        // disable scrolling
        window.addEventListener('scroll', noscroll);
        $.fn.fullpage.setAllowScrolling(false);

        // initial animation
        classie.add(container, 'loading');

        if (support.animations) {
            container.addEventListener(animEndEventName, onEndInitialAnimation);
        } else {
            onEndInitialAnimation();
        }
    }


    function startLoading() {

        // simulate loading something..
        var simulationFn = function(instance) {
            var progress = 0,
                interval = setInterval(function() {
                    progress = Math.min(progress + Math.random() * val2, val1);
                    //progress = Math.min(progress + Math.random() * 0.2, 1)
                    instance.setProgress(progress);

                    // reached the end
                    if (progress === 1) {

                        classie.remove(container, 'loading');
                        classie.add(container, 'loaded');
                        clearInterval(interval);

                        var onEndHeaderAnimation = function(ev) {
                            if (support.animations) {
                                if (ev.target !== header) return;
                                this.removeEventListener(animEndEventName, onEndHeaderAnimation);
                            }

                            classie.add(document.body, 'layout-switch');
                            window.removeEventListener('scroll', noscroll);
                            $.fn.fullpage.setAllowScrolling(true);
                            $("#fp-nav").show();
                            $('.ip-header').css({ 'background': 0 });
                        };

                        if (support.animations) {
                            header.addEventListener(animEndEventName, onEndHeaderAnimation);
                        } else {
                            onEndHeaderAnimation();
                        }
                    }
                }, 80);
        };


        loader.setProgressFn(simulationFn);

    }

    function noscroll() {
        window.scrollTo(0, 0);
    }

    loaderjs.init = init;

})(loaderjs || (loaderjs = {}));