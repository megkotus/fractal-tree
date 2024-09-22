"use strict";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const slider1 = document.getElementById("lengthRange");
const slider2 = document.getElementById("lengthDecrement");
const slider3 = document.getElementById("rightAngle");
const slider4 = document.getElementById("leftAngle");

// const length = 250;
// const lengthRatio = 0.7;
const angle = Math.PI / 10;
let lengthRatioInput;
let angleMultiplyer;
let rightAngle;
let leftAngle;
let lengthInput;

function background() {
  ctx.fillStyle = "lightblue";
  ctx.fillRect(10, 10, 1500, 1500);
}

function branch(len) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.translate(0, -len);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 10;
  ctx.stroke();
  if (len > 10) {
    ctx.save();
    ctx.rotate(rightAngle);
    branch(len * lengthRatioInput);
    console.log(lengthRatioInput);
    ctx.restore();
    ctx.save();
    ctx.rotate(leftAngle);
    branch(len * lengthRatioInput);
    ctx.restore();
  }
}

function draw() {
  background();
  ctx.translate(500, 1000);
  branch(lengthInput);
}

slider1.addEventListener("change", function () {
  if (lengthInput) ctx.reset();
  lengthInput = Number(slider1.value);
  draw();
});

slider2.addEventListener("change", function () {
  if (lengthRatioInput) ctx.reset();
  lengthRatioInput = Number(slider2.value) / 10;
  draw();
});

slider3.addEventListener("change", function () {
  if (rightAngle) ctx.reset();
  rightAngle = angle * Number(slider3.value);
  draw();
});

slider4.addEventListener("change", function () {
  if (leftAngle) ctx.reset();
  leftAngle = -(angle * Number(slider4.value));
  draw();
});

// To do:
// 1. draw only within canvas range
// 2. change bg color - form/dropdown
// 3. change stroke color - form/dropdown
// 4. Add starting values -> change reset condition
// 5. Add form

// Figure out: change line width - now the tree is a single path
