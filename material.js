export class Material {
  constructor(color, emission, roughness = 1) {
    this.color = color;
    this.emission = emission;
    this.roughness = roughness;
  }
}
