import { Scene } from "./scene.js";
import Vector3 from "./vector.js";
import { Camera } from "./camera.js";
import { Ray } from "./ray.js";
import { Sphere } from "./scene.js";

let r = new Ray(new Vector3(5, 5, 5), new Vector3(-2, -2, -2));
let s = new Sphere(new Vector3(2, 3, 3), 3);

console.log(new Vector3(5, 5, 5).dot(new Vector3(5, 5, 5)));

console.log(s.collision(r));

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let scene = new Scene([]);
let camera = new Camera(new Vector3(0, 0, 0), new Vector3(1), ctx, 0.5, scene);
