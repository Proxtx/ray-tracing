export class Scene {
  constructor(objects = []) {
    this.objects = objects;
  }
}

export class Sphere {
  constructor(pos, radius) {
    this.pos = pos;
    this.radius = radius;
  }

  /*collision(ray) {
    let p = ray.start.subtract(this.pos);
    let rSquared = this.radius * this.radius;

    let p_d = p.dot(ray.direction);
    console.log(p_d);

    if (p_d > 0 || p.dot(p) < rSquared) console.log("No collision");

    let a = p.subtract(ray.direction.multiply(p_d));

    let aSquared = a.dot(a);

    console.log(aSquared);

    if (aSquared > rSquared) console.log("No collision");

    let h = rSquared.subtract(aSquared).length();

    let i = a.subtract(ray.direction.multiply(h));

    let intersection = this.pos.add(i);

    let normal = i.multiply(1 / this.radius);

    console.log(intersection, normal);
  }*/

  /*collision(ray) {
    let m = ray.start.subtract(this.pos);
    let b = m.dot(ray.direction);
    let c = m.dot(m) - this.radius * this.radius;

    if (c > 0 && b > 0) return console.log("No collision");

    let discr = b * b - c;

    if (discr < 0) return console.log("No collision");

    let t = -b - Math.sqrt(discr);

    if (t < 0) t = 0;

    let q = ray.start.add(ray.direction.multiply(t));

    return q;
  }*/

  collision(ray) {
    let rS = ray.start;
    let sS = this.pos;
    let r = this.radius;
    let rD = ray.direction;

    let n = ray.direction;
    let d = n.dot(sS);

    console.log(n, d);

    let t =
      (d - n.x1 * rS.x1 - n.x2 * rS.x2 - n.x3 * rS.x3) /
      (n.x1 * rD.x1 + n.x2 * rD.x2 + n.x3 * rD.x3);

    let cP = rS.add(rD.multiply(t));

    let cPSCAbs = sS.subtract(cP).length();

    if (cPSCAbs > 3) return false;

    let cPbPAbs = Math.sqrt(Math.pow(this.radius, 2) - Math.pow(cPSCAbs, 2));

    let tMovementToCollisionPoints =
      cPbPAbs /
      Math.sqrt(Math.pow(rD.x1, 2) + Math.pow(rD.x2, 2) + Math.pow(rD.x3, 2));

    console.log(tMovementToCollisionPoints);

    let cp1 = cP.add(rD.multiply(tMovementToCollisionPoints));
    let cp2 = cP.add(rD.multiply(-tMovementToCollisionPoints));
    console.log(cp1, cp2);
  }
}
