"use strict";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Form
const form = document.getElementById("form");

const lengthInput = document.getElementById("length");
const lengthDecayInput = document.getElementById("decay");
const rightAngleMultiplyerInput = document.getElementById("right");
const leftAngleMultiplyerInput = document.getElementById("left");
const widthInput = document.getElementById("width");
const colorTreeInput = document.getElementById("treecolor");
const colorBgInput = document.getElementById("background-color");

const angle = Math.PI / 10;
let lengthRatio;
let rightAngle;
let leftAngle;
let length;
let width;
let colorTree;
let colorBg = colorBgInput.value;

function background() {
  ctx.fillStyle = colorBg;
  ctx.fillRect(10, 10, 1500, 1500);
}

function branch(len) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.translate(0, -len);
  ctx.strokeStyle = colorTree;
  ctx.lineWidth = width;
  ctx.stroke();
  if (len > 10) {
    ctx.save();
    ctx.rotate(rightAngle);
    branch(len * lengthRatio);
    ctx.restore();
    ctx.save();
    ctx.rotate(leftAngle);
    branch(len * lengthRatio);
    ctx.restore();
  }
}

function draw() {
  background();
  ctx.translate(600, 1000);
  branch(length);
}

background();

form.addEventListener("submit", function (e) {
  e.preventDefault();
  ctx.reset();

  length = +lengthInput.value;
  lengthRatio = +lengthDecayInput.value / 10;
  rightAngle = angle * +rightAngleMultiplyerInput.value;
  leftAngle = angle * -leftAngleMultiplyerInput.value;
  width = +widthInput.value;
  colorTree = colorTreeInput.value;
  colorBg = colorBgInput.value;

  draw();
});

// Done:
// 1. draw only within canvas range
// 2. change bg color - form/dropdown
// 3. change stroke color - form/dropdown
// 4. Add starting values -> change reset condition
// 5. Add form

// To do:
// 1. Classes or MCV
// 2. Apply more complicated algorythms

// ----------

// Figure out: decrease line width of new branches

// Getting the logic
// The trunk is called outside and the starting points are saved -> can use end points instead of translate

// function drawTree(start, startY, length, angle, branchWidth) {
//   ctx.lineWidth = branchWidth;
//   ctx.beginPath();
//   ctx.save();
//   ctx.strokeStyle = "pink";
//   ctx.fillStyle = "lightblue";
//   ctx.translate(start, startY);
//   ctx.rotate((angle * Math.PI) / 180);
//   ctx.moveTo(0, 0);
//   ctx.lineTo(0, -length);
//   ctx.stroke();

//   if (length < 10) {
//     ctx.restore();
//     return;
//   }

//   drawTree(0, -length, length * 0.8, angle - 12.5, branchWidth * 0.8);
//   drawTree(0, -length, length * 0.8, angle + 12.5, branchWidth * 0.8);

//   ctx.restore();
// }

// drawTree(500, 675, 120, 0, 45, 34, 244, 26);
// drawTree(500, 700, 100, 0, 10);
