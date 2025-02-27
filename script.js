"use strict";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Get form
const form = document.getElementById("form");
const download = document.getElementById("download");
const downloadSection = document.getElementById("downloadSection");

// Const
const ANGLE = Math.PI / 10;

function background(bgColor) {
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 1500, 1500);
}

const Rotation = Object.freeze({
  Straight: 0,
  Left: 1,
  Right: 2,
});

const rotations = Object.values(Rotation);

function getRandomRotation() {
  return rotations[Math.trunc(Math.random() * rotations.length)];
}

function processRotation(rotation, ctx, drawData, trunkLength) {
  if (rotation === Rotation.Right) {
    ctx.rotate(drawData.rightAngle);
    branch(drawData, trunkLength * drawData.branchDecay);
  } else if (rotation === Rotation.Left) {
    ctx.rotate(drawData.leftAngle);
    branch(drawData, trunkLength * drawData.branchDecay);
  } else {
    branch(drawData, trunkLength * drawData.branchDecay);
  }
}

function branch(drawData, trunkLength) {
  ctx.beginPath();
  // Draw trunk
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -trunkLength);
  // Move to the top
  ctx.translate(0, -trunkLength);
  ctx.strokeStyle = drawData.treeColor;
  ctx.lineWidth = drawData.width;
  ctx.stroke();
  // Draw branches
  if (trunkLength > 10) {
    ctx.save();
    processRotation(getRandomRotation(), ctx, drawData, trunkLength);
    processRotation(getRandomRotation(), ctx, drawData, trunkLength);

    ctx.restore();
  }
}

function draw(drawData) {
  ctx.reset();
  background(drawData.backgroundColor);
  ctx.translate(600, 1000);
  branch(drawData, drawData.trunkLength);
}

// Default color on load
background("#add8e6");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formObject = Object.fromEntries(formData.entries());

  const drawData = {
    ...formObject,
    branchDecay: +formObject.branchDecay / 10,
    leftAngle: ANGLE * +formObject.leftAngle,
    rightAngle: ANGLE * -formObject.rightAngle,
    trunkLength: +formObject.trunkLength,
    width: +formObject.width,
  };

  draw(drawData);
  downloadSection.classList.remove("hidden");
});

download.addEventListener("click", function (e) {
  canvas.toBlob(
    (blob) => {
      download.href = URL.createObjectURL(blob);
    },
    "image/jpeg",
    1
  );
});
