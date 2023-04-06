import { Scene } from "./scene.js";
import Vector3 from "./vector.js";
import { Camera } from "./camera.js";
import { Ray } from "./ray.js";
import { Sphere } from "./scene.js";
import { Material } from "./material.js";

let s = new Sphere(
  new Vector3(2, 3, 3),
  3,
  new Material(new Vector3(1, 0, 0), 1)
);

let s2 = new Sphere(
  new Vector3(3, 4, 3),
  3.2,
  new Material(new Vector3(0, 1, 0), 0, 0)
);

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let scene = new Scene([s, s2]);
let camera = new Camera(new Vector3(-22, 3, 3), new Vector3(1), ctx, 20, scene);

camera.generatePixelsCornerPoints(
  new Vector3(-17, 4, 4),
  new Vector3(-17, 2, 4),
  new Vector3(-17, 4, 2),
  new Vector3(-17, 2, 2),
  200
);

camera.render(2);
