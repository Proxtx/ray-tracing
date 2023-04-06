export class Material {
  constructor(color, emissionStrength, emissionColor, roughness = 1) {
    this.color = color;
    this.emissionStrength = emissionStrength;
    this.roughness = roughness;
    this.emissionColor = emissionColor;
  }
}
