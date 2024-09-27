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
  ctx.fillRect(10, 10, 1500, 1500);
}

const randomLineGenerator = function (num) {
  const chars = "[]+";
  let result = "";
  for (let i = 0; i < num; i++) {
    result += chars.charAt(Math.trunc(Math.random() * chars.length));
  }
  console.log(result);
  return result;
};

function branch(drawData) {
  let line = randomLineGenerator(2);

  ctx.beginPath();
  // Draw trunk
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -drawData.trunkLength);
  // Move to the top
  ctx.translate(0, -drawData.trunkLength);
  ctx.strokeStyle = drawData.treeColor;
  ctx.lineWidth = drawData.width;
  ctx.stroke();
  // Draw branches
  if (drawData.trunkLength > 10) {
    ctx.save();
    for (let i in line) {
      if (line[i] === "[") {
        ctx.rotate(drawData.rightAngle);
        branch({
          ...drawData,
          trunkLength: drawData.trunkLength * drawData.branchDecay,
        });
      } else if (line[i] === "]") {
        ctx.rotate(drawData.leftAngle);
        branch({
          ...drawData,
          trunkLength: drawData.trunkLength * drawData.branchDecay,
        });
      } else {
        branch({
          ...drawData,
          trunkLength: drawData.trunkLength * drawData.branchDecay,
        });
      }
    }

    ctx.restore();
  }
}

function draw(drawData) {
  ctx.reset();
  background(drawData.backgroundColor);
  ctx.translate(600, 1000);
  branch(drawData);
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

// Done:
// 1. draw only within canvas range
// 2. change bg color - form/dropdown
// 3. change stroke color - form/dropdown
// 4. Add starting values -> change reset condition
// 5. Add form
// 6. Created Form Data Object
// 7. Added generation of a random 2-symbol line to randomize branch growth direction
// 8. Added download button

// // To do:
// // 1. Apply L-system to generation
// // 2. Decrease line width of new branches
