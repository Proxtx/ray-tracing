import { Scene } from "./scene.js";
import Vector3 from "./vector.js";
import { Camera } from "./camera.js";
import { Ray } from "./ray.js";
import { Sphere } from "./scene.js";
import { Material } from "./material.js";

let s = new Sphere(
  new Vector3(2, 3, 3),
  3,
  new Material(new Vector3(1, 1, 1), 0, new Vector3(0), 1)
);

let s2 = new Sphere(
  new Vector3(-2, 8, 3),
  2,
  new Material(new Vector3(0, 0, 0), 7, new Vector3(0, 1, 0), 1)
);

let s3 = new Sphere(
  new Vector3(-2, -2, 5),
  2,
  new Material(new Vector3(0, 0, 0), 7, new Vector3(0, 0, 1), 1)
);

let s4 = new Sphere(
  new Vector3(0, 0, -50),
  50,
  new Material(new Vector3(1, 1, 1), 0, new Vector3(0, 0, 0), 1)
);

let s5 = new Sphere(
  new Vector3(0, 0, 0),
  2,
  new Material(new Vector3(1, 1, 1), 0, new Vector3(1, 1, 1), 0)
);

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let scene = new Scene([s, s2, s3, s5]);
let camera = new Camera(new Vector3(-22, 3, 3), new Vector3(1), ctx, 20, scene);

camera.generatePixelsCornerPoints(
  new Vector3(-17, 4, 4),
  new Vector3(-17, 2, 4),
  new Vector3(-17, 4, 2),
  new Vector3(-17, 2, 2),
  200
);

camera.render(2);
