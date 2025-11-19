"use strict";
var CircleAreaGraphicalApproach = /** @class */ (function () {
    function CircleAreaGraphicalApproach(canvas, provider) {
        this.canvas = canvas;
        this.provider = provider;
        this.DRAWING_MIN_ZOOM = .3;
        this.DRAWING_MAX_ZOOM = 20;
        this.DRAWING_WIDTH = 38;
        this.DRAWING_HEIGHT = 38;
        this.MIN_N_SLICES = 3;
        this.MAX_N_SLICES = 150;
        this.MIN_RADIUS = 1;
        this.MAX_RADIUS = 15;
        this.FILL_COLOR_FACING_UP = this.provider.makeCssColorSupplier("--canvas-primary-color");
        this.FILL_COLOR_FACING_DOWN = this.provider.makeCssColorSupplier("--canvas-secondary-color");
        this.coordinateOriginOffset = this.provider.makeVector2(0, 0);
        this.nSlices = 10;
        this.radius = 9;
        this.useHalfSlices = true;
    }
    CircleAreaGraphicalApproach.prototype.onFrameDraw = function (width, height) {
        var _this = this;
        var drawables = [];
        var coordinateOrigin = this.provider.makeVector2(width / 2, height / 2)
            .add(this.coordinateOriginOffset);
        var coordinateSystem = this.provider.makeCoordinateSystem(width, height, coordinateOrigin);
        coordinateSystem.axisColor = null;
        coordinateSystem.gridColor = null;
        drawables.push(coordinateSystem);
        // The full circle, 2PI, is being cut into n even slices
        var alpha = (2 * Math.PI) / this.nSlices;
        // l is the chord length of the circle sector
        // sin(alpha/2) = (l/2)/r
        // => l = sin(alpha/2) * 2 * r
        var l = Math.sin(alpha / 2) * 2 * this.radius;
        // (l/2)^2 + h^2 = r^2
        // => h = sqrt(r^2 - l^2/4)
        var rectangleHeight = Math.sqrt(Math.pow(this.radius, 2) - Math.pow(l, 2) / 4);
        var rectangleWidth = this.useHalfSlices ? (
        // Exactly half point up- and half downwards in all cases, as one slice is halved
        (this.nSlices / 2) * l) : (
        /*
          n | x*l
          3 | 1
          4 | 1.5
          5 | 2
          6 | 2.5
        */
        (this.nSlices % 2 == 0 ? this.nSlices / 2 - .5 : Math.floor(this.nSlices / 2)) * l);
        // Height including the overlapping circle slices
        var totalRectangleHeight = rectangleHeight + 2 * (this.radius - rectangleHeight);
        // Distance between the circle and the slices
        var figureDistance = 2;
        var rectanglePosition = coordinateSystem.accountForOrigin(this.provider.makeVector2(-rectangleWidth / 2, (2 * this.radius - totalRectangleHeight + figureDistance) / 2 + (this.radius - rectangleHeight)));
        var enclosingRectangle = this.provider.makeRectangle(rectanglePosition, rectangleWidth, rectangleHeight);
        drawables.push(enclosingRectangle);
        var circlePosition = coordinateSystem.accountForOrigin(this.provider.makeVector2(0, (totalRectangleHeight + figureDistance) / -2));
        var _loop_1 = function (i) {
            var isEvenSlice = i % 2 == 0;
            drawables.push(this_1.provider.makeCircleSlice(circlePosition, this_1.radius, alpha, { angleOffset: alpha * i })
                .configureStyle(function (style) { return style.fillColor = isEvenSlice ? _this.FILL_COLOR_FACING_DOWN : _this.FILL_COLOR_FACING_UP; }));
        };
        var this_1 = this;
        for (var i = 0; i < this.nSlices; ++i) {
            _loop_1(i);
        }
        // First half slice
        if (this.useHalfSlices) {
            drawables.push(this.provider.makeCircleSlice(rectanglePosition.copy().addValues(0, rectangleHeight), this.radius, alpha / 2, { angleOffset: 3 / 2 * Math.PI })
                .configureStyle(function (style) { return style.fillColor = _this.FILL_COLOR_FACING_UP; }));
        }
        for (var i = 0; i < this.nSlices; ++i) {
            var isFirstSlice = i == 0;
            var isEvenSlice = i % 2 == 0;
            // Skip the last slice, as it's cut in half
            if (this.useHalfSlices && i == this.nSlices - 1)
                continue;
            if (isEvenSlice) {
                drawables.push(this.provider.makeCircleSlice(rectanglePosition.copy().addValues(this.useHalfSlices ? (isFirstSlice ? 1 / 2 * l : (i + 1) / 2 * l) : (i / 2 * l), 0), this.radius, alpha, { angleOffset: Math.PI / 2 - alpha / 2 })
                    .configureStyle(function (style) { return style.fillColor = _this.FILL_COLOR_FACING_DOWN; }));
                continue;
            }
            drawables.push(this.provider.makeCircleSlice(rectanglePosition.copy().addValues(this.useHalfSlices ? ((i + 1) / 2 * l) : (i / 2 * l), rectangleHeight), this.radius, alpha, { angleOffset: Math.PI + (Math.PI / 2 - alpha / 2) })
                .configureStyle(function (style) { return style.fillColor = _this.FILL_COLOR_FACING_UP; }));
        }
        // Second half slice
        if (this.useHalfSlices) {
            var isEvenNumberOfSlices = this.nSlices % 2 == 0;
            if (isEvenNumberOfSlices) {
                drawables.push(
                // Whether the second half slice points up or down depends on the number
                // of slices between both half slices at the beginning and the end
                this.provider.makeCircleSlice(rectanglePosition.copy().addValues(rectangleWidth, rectangleHeight), this.radius, alpha / 2, { angleOffset: Math.PI + (Math.PI / 2 - alpha / 2) })
                    .configureStyle(function (style) { return style.fillColor = _this.FILL_COLOR_FACING_UP; }));
            }
            else {
                drawables.push(this.provider.makeCircleSlice(rectanglePosition.copy().addValues(rectangleWidth, 0), this.radius, alpha / 2, { angleOffset: Math.PI / 2 })
                    .configureStyle(function (style) { return style.fillColor = _this.FILL_COLOR_FACING_UP; }));
            }
        }
        return drawables;
    };
    CircleAreaGraphicalApproach.prototype.getTimeMsPerFrame = function () {
        return null;
    };
    CircleAreaGraphicalApproach.prototype.getMaxBounds = function () {
        return [this.DRAWING_WIDTH, this.DRAWING_HEIGHT];
    };
    CircleAreaGraphicalApproach.prototype.onCanvasMouseDown = function () { };
    CircleAreaGraphicalApproach.prototype.onCanvasMouseUp = function () { };
    CircleAreaGraphicalApproach.prototype.onCanvasMouseMove = function () { };
    CircleAreaGraphicalApproach.prototype.onCanvasKeyDown = function (keyEvent) { };
    CircleAreaGraphicalApproach.prototype.onCanvasKeyUp = function (keyEvent) { };
    CircleAreaGraphicalApproach.prototype.onCanvasZoom = function (delta) {
        var lastMousePosition = this.canvas.getLastMousePosition();
        this.canvas.setZoomLevel(this.canvas.getZoomLevel() + delta / -50);
        this.coordinateOriginOffset.add(this.canvas.getLastMousePosition()
            .copy()
            .subtract(lastMousePosition));
        this.canvas.draw(false);
    };
    CircleAreaGraphicalApproach.prototype.onCanvasScroll = function (deltaX, deltaY) {
        this.coordinateOriginOffset.addValues(deltaX / -90, deltaY / -90);
        this.canvas.draw(false);
    };
    CircleAreaGraphicalApproach.prototype.onCanvasSetup = function () {
        var _this = this;
        this.canvas.setZoomConstraints(this.DRAWING_MIN_ZOOM, this.DRAWING_MAX_ZOOM);
        var makeNumberOfSlicesText = function (value) { return "# Slices $n=".concat(value, "$"); };
        this.canvas.controlRegistry.registerSlider(function (handle) {
            handle.setMinMax(_this.MIN_N_SLICES, _this.MAX_N_SLICES);
            handle.setValue(_this.nSlices);
            handle.setText(makeNumberOfSlicesText(handle.getValue()));
        }, function (handle) {
            var value = handle.getValue();
            _this.nSlices = value;
            handle.setText(makeNumberOfSlicesText(value));
            _this.canvas.draw(false);
        });
        var makeRadiusText = function (value) { return "Radius $r=".concat(value, "$"); };
        this.canvas.controlRegistry.registerSlider(function (handle) {
            handle.setMinMax(_this.MIN_RADIUS, _this.MAX_RADIUS);
            handle.setValue(_this.radius);
            handle.setText(makeRadiusText(handle.getValue()));
        }, function (handle) {
            var value = handle.getValue();
            _this.radius = value;
            handle.setText(makeRadiusText(value));
            _this.canvas.draw(false);
        });
        this.canvas.controlRegistry.registerButton(function (handle) {
            handle.setText("Use Half Slices");
            handle.setActive(_this.useHalfSlices);
        }, function (handle) {
            _this.useHalfSlices = !_this.useHalfSlices;
            handle.setActive(_this.useHalfSlices);
            _this.canvas.draw(false);
        });
    };
    return CircleAreaGraphicalApproach;
}());
(function () {
    window.LastLoadedDrawingFactory = function (canvas, provider) { return new CircleAreaGraphicalApproach(canvas, provider); };
})();
