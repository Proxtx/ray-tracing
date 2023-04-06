export class Scene {
  constructor(objects = []) {
    this.objects = objects;
  }
}

export class Sphere {
  constructor(pos, radius, material) {
    this.pos = pos;
    this.radius = radius;
    this.material = material;
  }

  collision(ray) {
    let rS = ray.start;
    let sS = this.pos;
    let r = this.radius;
    let rD = ray.direction;

    let n = ray.direction;
    let d = n.dot(sS);

    let t =
      (d - n.x1 * rS.x1 - n.x2 * rS.x2 - n.x3 * rS.x3) /
      (n.x1 * rD.x1 + n.x2 * rD.x2 + n.x3 * rD.x3);

    if (t < 0) return new Collision([], rS, this);

    let cP = rS.add(rD.multiply(t));
    let cPSCAbs = sS.subtract(cP).length();

    if (cPSCAbs > r) return new Collision([], rS, this);
    if (cPSCAbs == r)
      return new Collision([new CollisionPoint(cP, cP.subtract(sS))], rS, this);

    let cPbPAbs = Math.sqrt(Math.pow(r, 2) - Math.pow(cPSCAbs, 2));

    let tMovementToCollisionPoints =
      cPbPAbs /
      Math.sqrt(Math.pow(rD.x1, 2) + Math.pow(rD.x2, 2) + Math.pow(rD.x3, 2));

    let cp1 = cP.add(rD.multiply(tMovementToCollisionPoints));
    let cp2 = cP.add(rD.multiply(-tMovementToCollisionPoints));

    return new Collision(
      [
        new CollisionPoint(cp1, cp1.subtract(sS)),
        new CollisionPoint(cp2, cp2.subtract(sS)),
      ],
      rS,
      this
    );
  }
}

export class Collision {
  constructor(points, origin, object) {
    this.points = points;
    this.origin = origin;
    this.object = object;

    for (let point of points) point.collision = this;
  }

  hasCollided() {
    return this.points.length != 0;
  }

  closestCollision() {
    let smallestDistance = Infinity;
    let smallestPoint;

    for (let point of this.points) {
      let dist = point.point.subtract(this.origin).length();
      if (dist < smallestDistance) {
        smallestPoint = point;
        smallestDistance = dist;
      }
    }

    return [smallestPoint, smallestDistance];
  }
}

export class CollisionPoint {
  constructor(point, normal) {
    this.point = point;
    this.normal = normal;
  }
}
