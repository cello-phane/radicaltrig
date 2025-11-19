import {
  CanvasHandle,
  CanvasTypeProvider,
  Drawable,
  Drawing,
} from 'canvas-draw';

class CircleAreaGraphicalApproach implements Drawing {

  private DRAWING_MIN_ZOOM = .3;
  private DRAWING_MAX_ZOOM = 20;
  private DRAWING_WIDTH    = 38;
  private DRAWING_HEIGHT   = 38;

  private MIN_N_SLICES = 3;
  private MAX_N_SLICES = 150;
  private MIN_RADIUS   = 1;
  private MAX_RADIUS   = 15;

  private FILL_COLOR_FACING_UP = this.provider.makeCssColorSupplier("--canvas-primary-color");
  private FILL_COLOR_FACING_DOWN = this.provider.makeCssColorSupplier("--canvas-secondary-color");

  private coordinateOriginOffset = this.provider.makeVector2(0, 0);

  private nSlices = 10;
  private radius = 9;
  private useHalfSlices = true;

  constructor(private canvas: CanvasHandle, private provider: CanvasTypeProvider) {}

  onFrameDraw(width: number, height: number): Drawable[] {
    const drawables: Drawable[] = []

    const coordinateOrigin = this.provider.makeVector2(width / 2, height / 2)
      .add(this.coordinateOriginOffset);

    const coordinateSystem = this.provider.makeCoordinateSystem(width, height, coordinateOrigin);
    coordinateSystem.axisColor = null
    coordinateSystem.gridColor = null
    drawables.push(coordinateSystem)

    // The full circle, 2PI, is being cut into n even slices
    const alpha = (2 * Math.PI) / this.nSlices;

    // l is the chord length of the circle sector
    // sin(alpha/2) = (l/2)/r
    // => l = sin(alpha/2) * 2 * r
    const l = Math.sin(alpha / 2) * 2 * this.radius;

    // (l/2)^2 + h^2 = r^2
    // => h = sqrt(r^2 - l^2/4)
    const rectangleHeight = Math.sqrt(Math.pow(this.radius, 2) - Math.pow(l, 2) / 4);

    const rectangleWidth = this.useHalfSlices ? (
      // Exactly half point up- and half downwards in all cases, as one slice is halved
      (this.nSlices / 2) * l
    ) : (
      /*
        n | x*l
        3 | 1
        4 | 1.5
        5 | 2
        6 | 2.5
      */
      (this.nSlices % 2 == 0 ? this.nSlices / 2 - .5 : Math.floor(this.nSlices / 2)) * l
    );

    // Height including the overlapping circle slices
    const totalRectangleHeight = rectangleHeight + 2 * (this.radius - rectangleHeight);

    // Distance between the circle and the slices
    const figureDistance = 2;

    const rectanglePosition = coordinateSystem.accountForOrigin(this.provider.makeVector2(
      -rectangleWidth / 2,
      (2 * this.radius - totalRectangleHeight + figureDistance)/2 + (this.radius - rectangleHeight)
    ));

    const enclosingRectangle = this.provider.makeRectangle(rectanglePosition, rectangleWidth, rectangleHeight)
    drawables.push(enclosingRectangle);

    const circlePosition = coordinateSystem.accountForOrigin(this.provider.makeVector2(
      0,
      (totalRectangleHeight + figureDistance)/-2
    ));

    for (let i = 0; i < this.nSlices; ++i) {
      const isEvenSlice = i % 2 == 0;

      drawables.push(
        this.provider.makeCircleSlice(
          circlePosition,
          this.radius,
          alpha,
          { angleOffset: alpha * i }
        )
          .configureStyle(style => style.fillColor = isEvenSlice ? this.FILL_COLOR_FACING_DOWN : this.FILL_COLOR_FACING_UP)
      );
    }

    // First half slice
    if (this.useHalfSlices) {
      drawables.push(
        this.provider.makeCircleSlice(
          rectanglePosition.copy().addValues(0, rectangleHeight),
          this.radius, alpha / 2,
          { angleOffset: 3/2 * Math.PI },
        )
        .configureStyle(style => style.fillColor = this.FILL_COLOR_FACING_UP)
      );
    }

    for (let i = 0; i < this.nSlices; ++i) {
      const isFirstSlice = i == 0;
      const isEvenSlice = i % 2 == 0;

      // Skip the last slice, as it's cut in half
      if (this.useHalfSlices && i == this.nSlices - 1)
        continue;

      if (isEvenSlice) {
        drawables.push(
          this.provider.makeCircleSlice(
            rectanglePosition.copy().addValues(
              this.useHalfSlices ? (
                isFirstSlice ? 1/2 * l : (i + 1)/2 * l
              ) : (
                i/2 * l
              ),
              0
            ),
            this.radius, alpha,
            { angleOffset: Math.PI/2 - alpha / 2 },
          )
          .configureStyle(style => style.fillColor = this.FILL_COLOR_FACING_DOWN)
        );
        continue;
      }

      drawables.push(
        this.provider.makeCircleSlice(
          rectanglePosition.copy().addValues(
            this.useHalfSlices ? (
              (i + 1)/2 * l
            ) : (
              i/2 * l
            ),
            rectangleHeight
          ),
          this.radius, alpha,
          { angleOffset: Math.PI + (Math.PI/2 - alpha / 2) },
        )
        .configureStyle(style => style.fillColor = this.FILL_COLOR_FACING_UP)
      );
    }

    // Second half slice
    if (this.useHalfSlices) {
      const isEvenNumberOfSlices = this.nSlices % 2 == 0;

      if (isEvenNumberOfSlices) {
        drawables.push(
          // Whether the second half slice points up or down depends on the number
          // of slices between both half slices at the beginning and the end
          this.provider.makeCircleSlice(
            rectanglePosition.copy().addValues(rectangleWidth, rectangleHeight),
            this.radius, alpha / 2,
            { angleOffset: Math.PI + (Math.PI/2 - alpha / 2) },
          )
          .configureStyle(style => style.fillColor = this.FILL_COLOR_FACING_UP)
        );
      }

      else {
        drawables.push(
          this.provider.makeCircleSlice(
            rectanglePosition.copy().addValues(rectangleWidth, 0),
            this.radius, alpha / 2,
            { angleOffset: Math.PI / 2 },
          )
          .configureStyle(style => style.fillColor = this.FILL_COLOR_FACING_UP)
        );
      }
    }

    return drawables
  }

  getTimeMsPerFrame(): number | null {
    return null;
  }

  getMaxBounds(): [number, number] {
    return [this.DRAWING_WIDTH, this.DRAWING_HEIGHT];
  }

  onCanvasMouseDown(): void {}
  onCanvasMouseUp(): void {}
  onCanvasMouseMove(): void {}
  onCanvasKeyDown(keyEvent: KeyboardEvent): void {}
  onCanvasKeyUp(keyEvent: KeyboardEvent): void {}

  onCanvasZoom(delta: number): void {
    const lastMousePosition = this.canvas.getLastMousePosition()

    this.canvas.setZoomLevel(this.canvas.getZoomLevel() + delta / -50);

    this.coordinateOriginOffset.add(
      this.canvas.getLastMousePosition()
      .copy()
      .subtract(lastMousePosition)
    );

    this.canvas.draw(false);
  }

  onCanvasScroll(deltaX: number, deltaY: number): void {
    this.coordinateOriginOffset.addValues(deltaX / -90, deltaY / -90);
    this.canvas.draw(false);
  }

  onCanvasSetup(): void {
    this.canvas.setZoomConstraints(this.DRAWING_MIN_ZOOM, this.DRAWING_MAX_ZOOM);

    const makeNumberOfSlicesText = (value: number) => `# Slices $n=${value}$`;

    this.canvas.controlRegistry.registerSlider(
      handle => {
        handle.setMinMax(this.MIN_N_SLICES, this.MAX_N_SLICES)
        handle.setValue(this.nSlices);
        handle.setText(makeNumberOfSlicesText(handle.getValue()));
      },
      handle => {
        const value = handle.getValue();
        this.nSlices = value;
        handle.setText(makeNumberOfSlicesText(value));
        this.canvas.draw(false);
      }
    );

    const makeRadiusText = (value: number) => `Radius $r=${value}$`;

    this.canvas.controlRegistry.registerSlider(
      handle => {
        handle.setMinMax(this.MIN_RADIUS, this.MAX_RADIUS)
        handle.setValue(this.radius);
        handle.setText(makeRadiusText(handle.getValue()));
      },
      handle => {
        const value = handle.getValue();
        this.radius = value;
        handle.setText(makeRadiusText(value));
        this.canvas.draw(false);
      }
    );

    this.canvas.controlRegistry.registerButton(
      handle => {
        handle.setText("Use Half Slices");
        handle.setActive(this.useHalfSlices);
      },
      handle => {
        this.useHalfSlices = !this.useHalfSlices;
        handle.setActive(this.useHalfSlices);
        this.canvas.draw(false);
      }
    );
  }
}

(() => {
  window.LastLoadedDrawingFactory = (canvas, provider) => new CircleAreaGraphicalApproach(canvas, provider);
})();