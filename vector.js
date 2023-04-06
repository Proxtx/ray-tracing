export class Vector3 {
  constructor(x1 = 0, x2 = 0, x3 = 0) {
    this.x1 = Number(x1);
    this.x2 = Number(x2);
    this.x3 = Number(x3);
  }

  multiply(n) {
    if (n instanceof Vector3)
      return new Vector3(this.x1 * n.x1, this.x2 * n.x2, this.x3 * n.x3);
    else return new Vector3(this.x1 * n, this.x2 * n, this.x3 * n);
  }

  flatten() {
    return this.x1 + this.x2 + this.x3;
  }

  invert() {
    return this.multiply(-1);
  }

  normal(n) {
    return new Vector3(
      this.x2 * n.x3 - this.x3 * n.x2,
      this.x3 * n.x1 - this.x1 * n.x3,
      this.x1 * n.x2 - this.x2 * n.x1
    );
  }

  length() {
    return Math.sqrt(
      Math.pow(this.x1, 2) + Math.pow(this.x2, 2) + Math.pow(this.x3, 2)
    );
  }

  add(n) {
    return new Vector3(this.x1 + n.x1, this.x2 + n.x2, this.x3 + n.x3);
  }

  subtract(n) {
    return this.add(n.multiply(-1));
  }

  dot(n) {
    return this.multiply(n).flatten();
  }

  random() {
    return new Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    );
  }

  normalize() {
    let t =
      1 /
      Math.sqrt(
        Math.pow(this.x1, 2) + Math.pow(this.x2, 2) + Math.pow(this.x3, 2)
      );

    return this.multiply(t);
  }

  lerp(n, alpha) {
    return new Vector3(
      lerp(this.x1, n.x1, alpha),
      lerp(this.x2, n.x2, alpha),
      lerp(this.x3, n.x3, alpha)
    );
  }
}

export default Vector3;

const lerp = (a, b, alpha) => {
  return a + alpha * (b - a);
};
