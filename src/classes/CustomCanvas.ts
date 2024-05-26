export default class CustomCanvas {
  canvas: HTMLCanvasElement;
  canvasCtx: CanvasRenderingContext2D;
  imageElement: HTMLImageElement | null;

  constructor(
    imageElement: HTMLImageElement | null,
    width: number = 1,
    height: number = 1,
    border: boolean = false
  ) {
    this.imageElement = imageElement;
    this.canvas = document.createElement("canvas");
    this.canvasCtx = this.canvas.getContext("2d")!;
    this.canvas.width = width;
    this.canvas.height = height;
    if (border) this.canvas.style.setProperty("border", "1px solid black");
  }
  // TODO: Check if this part is needed
  // imageData(data) {
  //   const temp = this.canvasCtx.createImageData(
  //     this.canvas.width,
  //     this.canvas.height
  //   );
  //   temp.data.set(data);
  //   this.canvasCtx.putImageData(temp, 0, 0);
  // }
  addCanvas(canvasElement: HTMLCanvasElement, left: number, top: number, width?: number, height?: number) {
    if (width && height) {
      this.canvasCtx.drawImage(canvasElement, left, top, width, height);
    } else {
      this.canvasCtx.drawImage(canvasElement, left, top);
    }
  }

  fillSolid(dx?: number, dy?: number, color: string = "black") {
    this.canvasCtx.fillStyle = color;
    this.canvasCtx.fillRect(0, 0, dx ?? this.canvas.width, dy ?? this.canvas.height);
  }

  setWidth(w: number) {
    this.canvas.width = w;
  }

  setHeight(h: number) {
    this.canvas.height = h;
  }

  getHeight(): number {
    return this.canvas.height;
  }

  /**
   * @param type "image/jpeg" | "image/png"
   * @param quality
   */
  toDataURL(type?: string, quality: number = 0.1) {
    return this.canvas.toDataURL(type, quality);
  }

  drawImage(
    image: CanvasImageSource,
    sx: number,
    sy: number,
    sWidth?: number,
    sHeight?: number,
    dx?: number,
    dy?: number,
    dWidth?: number,
    dHeight?: number
  ) {
    if (sWidth && sHeight && dx && dy && dWidth && dHeight) {
      // prettier-ignore
      this.canvasCtx.drawImage(
        image,
        sx, sy, sWidth, sHeight,
        dx, dy, dWidth, dHeight
      );
    } else if (sWidth && sHeight) {
      this.canvasCtx.drawImage(image, sx, sy, sWidth, sHeight);
    } else {
      this.canvasCtx.drawImage(image, sx, sy);
    }
  }

  increaseWidth(amount: number = 1) {
    this.canvas.width += amount;
    this.displayCanvasToImg();
  }

  decreaseWidth(amount: number = 1) {
    this.canvas.width -= amount;
    this.displayCanvasToImg();
  }

  decreaseHeight(amount: number = 1) {
    this.canvas.height -= amount;
    this.displayCanvasToImg();
  }

  displayCanvasToImg(type: string = "image/jpeg", quality: number = 0.1) {
    if (this.imageElement) {
      this.imageElement.src = this.toDataURL(type, quality);
    } else {
      throw new Error("Image element is not provided");
    }
  }
}
