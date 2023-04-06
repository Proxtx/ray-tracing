import Vector3 from "./vector.js";
import { Ray } from "./ray.js";

export class Camera {
  rayDepth = 30;
  rayAmount = 100;

  constructor(pos, direction, display, resolution, scene) {
    this.pos = pos;
    this.direction = direction;
    this.display = display;
    this.resolution = resolution;
    this.scene = scene;
    this.width = this.display.canvas.width;
    this.height = this.display.canvas.height;
  }

  generatePixels() {
    this.pixelCountX = this.width * this.resolution;
    this.pixelCountY = this.height * this.resolution;
    this.pixelWidth = this.width / this.pixelCountX;
    this.pixelHeight = this.height / this.pixelCountY;

    this.pixelMatrix = [];

    let pixelsCenter = this.pos.add(this.direction);

    for (let pixelIndexX = 0; pixelIndexX < this.pixelCountX; pixelIndexX++) {
      this.pixelMatrix.push([]);

      let x1 =
        pixelsCenter.x1 + (this.pixelWidth * pixelIndexX - this.width / 2);

      for (let pixelIndexY = 0; pixelIndexY < this.pixelCountY; pixelIndexY++) {
        let x2 =
          pixelsCenter.x2 + (this.pixelHeight * pixelIndexY - this.height / 2);

        this.pixelMatrix[pixelIndexX].push(
          new Pixel(new Vector3(x1, x2, pixelsCenter.x3), this, this.scene)
        );
      }
    }
  }

  generatePixelsCornerPoints(tl, tr, bl, br, worldToScreenMultiplier) {
    this.worldToScreenMultiplier = worldToScreenMultiplier;

    this.pixelMatrix = [];
    let amountUp = tl.subtract(bl).length() * worldToScreenMultiplier;
    let amountLeft = tl.subtract(tr).length() * worldToScreenMultiplier;
    let movementDown = bl.subtract(tl).multiply(1 / amountUp);
    let movementRight = tr.subtract(tl).multiply(1 / amountLeft);

    while (this.pixelMatrix.length < amountUp + 1) {
      this.pixelMatrix.push([]);
      while (
        this.pixelMatrix[this.pixelMatrix.length - 1].length <
        amountLeft + 1
      ) {
        this.pixelMatrix[this.pixelMatrix.length - 1].push(
          new Pixel(
            tl
              .add(movementDown.multiply(this.pixelMatrix.length - 1))
              .add(
                movementRight.multiply(
                  this.pixelMatrix[this.pixelMatrix.length - 1].length
                )
              ),
            this
          )
        );
      }
    }
  }

  render(pixelSize) {
    this.pixelSize = pixelSize;

    this.display.clearRect(0, 0, this.width, this.height);
    for (let pixelRowIndex in this.pixelMatrix) {
      for (let pixelColumnIndex in this.pixelMatrix[pixelRowIndex]) {
        let pixel = this.pixelMatrix[pixelRowIndex][pixelColumnIndex];
        let color = pixel.color();
        this.display.fillStyle = `rgb(${255 * color.x1},${255 * color.x2},${
          255 * color.x3
        })`;

        this.display.fillRect(
          pixelColumnIndex * this.pixelSize,
          pixelRowIndex * this.pixelSize,
          this.pixelSize,
          this.pixelSize
        );
      }
    }
  }
}

class Pixel {
  constructor(pos, camera) {
    this.pos = pos;
    this.camera = camera;
    this.direction = this.pos.subtract(this.camera.pos);
  }

  color() {
    let colors = [];
    while (colors.length < this.camera.rayAmount) {
      let ray = new Ray(this.pos, this.direction);
      colors.push(this.shootRay(ray));
    }

    //if (colors[0].x1 == 1) console.log(colors);
    let avgColor = new Vector3();

    for (let color of colors) {
      avgColor = avgColor.add(color);
    }

    avgColor = avgColor.multiply(1 / colors.length);

    return avgColor;
  }

  shootRay(ray) {
    let incomingLight = new Vector3(0, 0, 0);
    let rayColor = new Vector3(1, 1, 1);

    for (let depth = 0; depth < this.camera.rayDepth; depth++) {
      let hit = this.calculateRayCollision(ray);
      if (hit[0]) {
        ray.start = hit[0].point;

        let material = hit[0].collision.object.material;

        const randomDirection = getBounceVector(
          hit[0],
          hit[0].collision.object.material
        );
        const specularDirection = getReflectingVector(
          ray.direction,
          hit[0].normal
        );
        ray.direction = randomDirection.lerp(
          specularDirection,
          1 - material.roughness
        );

        let emittedLight = material.emissionColor.multiply(
          material.emissionStrength
        );
        let lightStrength = hit[0].normal.dot(ray.direction);

        incomingLight = incomingLight.add(emittedLight.multiply(rayColor));
        rayColor = rayColor.multiply(material.color).multiply(lightStrength);
      } else {
        incomingLight = incomingLight.add(rayColor.multiply(0.2));
        break;
      }
    }

    return incomingLight;
  }

  calculateRayCollision(ray) {
    let closestHit = [null, Infinity];

    for (let object of this.camera.scene.objects) {
      let collision = object.collision(ray);
      if (collision.hasCollided()) {
        let closestCollision = collision.closestCollision();
        if (closestCollision[1] < closestHit[1]) closestHit = closestCollision;
      }
    }

    return closestHit;
  }
}

const getBounceVector = (collisionPoint, material) => {
  let v = new Vector3().random();
  if (collisionPoint.normal.dot(v) < 0) v = v.invert();
  return v;
};

const getReflectingVector = (inV, n) => {
  n = n.normalize();
  return inV.subtract(n.multiply(inV.dot(n)).multiply(2));
};
