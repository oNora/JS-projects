(function () {
    var cvs = document.createElement('canvas'),
        context = cvs.getContext("2d");
    $("#section0").append(cvs);

    var numDots = 1500,
        n = numDots,
        currDot,
        maxRad = 1100,
        minRad = 190,
        radDiff = maxRad - minRad,
        dots = [],
        PI = Math.PI,
        centerPt = { x: 0, y: 0 };

    resizeHandler();
    window.onresize = resizeHandler;

    while (n--) {
        currDot = {};
        currDot.radius = minRad + Math.random() * radDiff;
        currDot.radiusV = 10 + Math.random() * 10,
            currDot.radiusVS = (1 - Math.random() * 2) * 0.001,
            currDot.radiusVP = Math.random() * PI,
            currDot.ang = (1 - Math.random() * 2) * PI;
        currDot.speed = (1 - Math.random() * 2);
        //currDot.speed = 1 - Math.round(Math.random()) * 1;
        currDot.speed = 0.1;
        currDot.intensityP = Math.random() * PI;
        currDot.intensityS = Math.random() * 0.01;
        currDot.intensityO = 64 + Math.round(Math.random() * 24);
        currDot.intensityV = Math.min(Math.random() * 255, currDot.intensityO);
        currDot.intensity = Math.round(Math.random() * 255);
        currDot.fillColor = "rgb(255,255,255)";
        dots.push(currDot);
    }

    function drawPoints() {
        n = numDots;
        var _centerPt = centerPt,
            _context = context,
            dX = 0,
            dY = 0;

        _context.clearRect(0, 0, cvs.width, cvs.height);

        var radDiff;
        //draw dots
        while (n--) {

            var opacity = 1;

            currDot = dots[n];
            currDot.radiusVP += currDot.radiusVS;
            radDiff = currDot.radius + Math.sin(currDot.radiusVP) * currDot.radiusV;
            dX = _centerPt.x + Math.sin(currDot.ang) * radDiff;
            dY = _centerPt.y + Math.cos(currDot.ang) * radDiff;

            //currDot.ang += currDot.speed;
            currDot.ang += currDot.speed * radDiff / 100000;
            currDot.intensityP += currDot.intensityS;
            currDot.intensity = Math.round(currDot.intensityO + Math.sin(currDot.intensityP) * currDot.intensityV);

            //console.log(currDot);
            _context.fillStyle = "rgba(255,255,255," + opacity + ")";


            _context.fillRect(dX, dY, 2, 2);



        } //draw dot
        window.requestAnimationFrame(drawPoints);
    }

    function resizeHandler() {
        var box = cvs.getBoundingClientRect();
        var w = box.width;
        var h = box.height;
        cvs.width = w;
        cvs.height = h;
        centerPt.x = Math.round(w / 2);
        centerPt.y = Math.round(h / 20);
    }

    drawPoints();
})();