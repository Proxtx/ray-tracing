import Vector3 from "./vector.js";

export class Camera {
  constructor(pos, direction, display, resolution, scene) {
    this.pos = pos;
    this.direction = direction;
    this.display = display;
    this.resolution = resolution;
    this.scene = scene;

    this.generatePixels();

    console.log(this.pixelMatrix);
  }

  generatePixels() {
    this.pixelCountX = this.display.canvas.width * this.resolution;
    this.pixelCountY = this.display.canvas.height * this.resolution;
    this.pixelWidth = this.display.canvas.width / this.pixelCountX;
    this.pixelHeight = this.display.canvas.height / this.pixelCountY;

    this.pixelMatrix = [];

    let pixelsCenter = this.pos.add(this.direction);

    for (let pixelIndexX = 0; pixelIndexX < this.pixelCountX; pixelIndexX++) {
      this.pixelMatrix.push([]);

      let x1 =
        pixelsCenter.x1 +
        (this.pixelWidth * pixelIndexX - this.display.canvas.width / 2);

      for (let pixelIndexY = 0; pixelIndexY < this.pixelCountY; pixelIndexY++) {
        let x2 =
          pixelsCenter.x2 +
          (this.pixelHeight * pixelIndexY - this.display.canvas.height / 2);

        this.pixelMatrix[pixelIndexX].push(
          new Pixel(new Vector3(x1, x2, pixelsCenter.x3))
        );
      }
    }
  }
}

class Pixel {
  constructor(pos, camera, scene) {
    this.pos = pos;
    this.camera = camera;
    this.scene = scene;
  }
}
