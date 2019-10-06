let canvasTree = document.getElementById("tree");

const w = window.innerWidth;
const h = window.innerHeight;

canvasTree.width = w;
canvasTree.height = h;
const bendability = 2; // greater than 1. The bigger this number the more the thin branches will bend first

const canvases = {};
const leavesCanvases = {};

let context = canvasTree.getContext("2d");

let arr = [];
let lines = {};
let leaves = {};
let leafColorArrayLen;
let leavesColors = [0, 0];
let darkestColor;
let maxDepth = 13;
let leavesVisibility;
const branchGroupDepth = 10;
const leavesGroupSize = 2 ** (branchGroupDepth - 1);
const maxAngle = 20;
const minAngle = 15;
const maxBranchLenght = Math.ceil(h / 102);
const minBranchLenght = 1;
const leafBendability = 20;
const treeStart = h - 165;
let groupCounter = 0;
let branchCounter = 0;
var windStrength;

function valueTransformer(aFrom, aTo, bFrom, bTo, aVal) {
  const percentage = ((aVal - aFrom) * 100) / (aTo - aFrom);
  const bVal = (percentage * (bTo - bFrom) / 100) + bFrom; 
  return bVal;
}

function divide(min = 0, max, units, n) {
  return Math.min(Math.floor((n - min) / ((max - min) / units)), units);
}

function random(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}
const calcX = (angle, r) => r * Math.cos(angle);
const calcY = (angle, r) => r * Math.sin(angle);

export function generateTree(weatherConditions) {
  const { month, wind } = weatherConditions;
  const { treeColor } = weatherConditions.tree;
  windStrength = valueTransformer(0, 3, 0, 1, wind) * bendability * (200 ** 2 / canvasTree.height ** 2); // wind strength


  if (month == 9) {
    leavesVisibility = 1;
  } else if (month == 10) {
    leavesVisibility = 4;
  } else {
    leavesVisibility = 0;
  }
  if (month != 11 && month != 0 && month != 1) {
    leafColorArrayLen = treeColor.length - 1;
    darkestColor = treeColor[leafColorArrayLen]
    leavesColors = treeColor.concat(
      treeColor.slice(0).reverse()
    );
  }
  generate(-90, maxDepth, arr, 1);
}

function generate(angle, depth, arr, visibility) {
  let randomLeafColor =
  leavesColors[
      divide(0, leavesGroupSize, (leafColorArrayLen - 1) * 2, groupCounter)
    ];
  arr.push({
    angle,
    branchArmLength: random(minBranchLenght, maxBranchLenght),
    color: randomLeafColor,
    visibility
  });

  if (depth === branchGroupDepth) {
    groupCounter = 0;
  }
  if (depth === 0) {
    groupCounter++;
  }
  if (depth != 0) {
    if (depth > 1) {
      generate(angle - random(minAngle, maxAngle), depth - 1, arr, 1);
      generate(angle + random(minAngle, maxAngle), depth - 1, arr, 1);
    } else {
      const leavesVisibilityProbability = random(0, leavesVisibility);
      generate(angle, depth - 1, arr, leavesVisibilityProbability);
    }
  }
}

function branch(x1, y1, arr, depth, windConfig) {
  let { branchArmLength, angle, color, visibility } = arr[branchCounter++];
  let { windActual, windX, windY } = windConfig;
  let dir = angle * (Math.PI / 180.0);

  if (depth != 0) {
    const xx = calcX(dir, depth * branchArmLength);
    const yy = calcY(dir, depth * branchArmLength);
    const windSideWayForce = windX * yy - windY * xx;
    const bendabiityOfCurrentBranch =
      (1 - (depth * 0.7) / (maxDepth * 0.7)) ** bendability;
    dir +=
      windStrength * windActual * bendabiityOfCurrentBranch * windSideWayForce;
    let x2 = x1 + calcX(dir, depth * branchArmLength);
    let y2 = y1 + calcY(dir, depth * branchArmLength);
    lines[depth] = lines[depth] || [];
    lines[depth].push([x1, y1, x2, y2]);

    if (depth > 1) {
      branch(x2, y2, arr, depth - 1, windConfig);
      branch(x2, y2, arr, depth - 1, windConfig);
    } else {
      branch(x2, y2, arr, depth - 1, windConfig);
    }
  } else {
    const xx = calcX(dir, 1);
    const yy = calcY(dir, 1);
    const windSideWayForce = windX * yy - windY * xx;
    const leafAngle = angle + windActual * windSideWayForce * leafBendability;
    leaves[color] = leaves[color] || [];
    leaves[color].push([x1, y1, leafAngle, visibility]);
  }
}

function drawLines(context) {
  context.strokeStyle = "#2b1010";

  Object.entries(lines).forEach(([thickness, lines]) => {
    context.lineWidth = thickness * 0.6;
    context.beginPath();

    while (lines.length) {
      const [x1, y1, x2, y2] = lines.pop();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
    }

    context.closePath();
    context.stroke();
  });
}

function drawLeaves(context, treeConfig) {
  const { leavesSize, treeColor } = treeConfig;
  Object.entries(leaves)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([color, leaves]) => {
      const strokeColorIndex = treeColor.indexOf(color);
      const strokeColor =
        strokeColorIndex == treeColor.length - 1
          ? darkestColor
          : treeColor[strokeColorIndex + 1];
      context.fillStyle = color;
      context.strokeStyle = strokeColor;
      context.beginPath();
      while (leaves.length) {
        const [x, y, angle, visibility] = leaves.pop();
        if (!visibility) {
          const leafAng = angle * (Math.PI / 180);
          const devAng = leavesSize.deviation * (Math.PI / 180);
          const leafHeight = leavesSize.height;
          let x2 = x + calcX(leafAng, leafHeight),
            y2 = y + calcY(leafAng, leafHeight),
            x3 = x + calcX(leafAng + devAng, leafHeight / 2),
            y3 = y + calcY(leafAng + devAng, leafHeight / 2),
            x4 = x + calcX(leafAng - devAng, leafHeight / 2),
            y4 = y + calcY(leafAng - devAng, leafHeight / 2);

          context.moveTo(x, y);
          context.quadraticCurveTo(x3, y3, x2, y2);
          context.quadraticCurveTo(x4, y4, x, y);

          context.moveTo(x, y);
          context.lineTo(x2, y2);
        }
      }

      context.closePath();
      context.fill();
      context.stroke();
    });
}

function getTreeCanvas(windConfig) {
  const key = parseInt(windConfig.windActual * 60);

  if (!canvases[key]) {
    let m_canvas = document.createElement("canvas");
    m_canvas.width = canvasTree.width;
    m_canvas.height = canvasTree.height;
    let m_context = m_canvas.getContext("2d");
    m_context.beginPath();
    m_context.rect(0, 0, 1500, 1000);
    m_context.fillStyle = "transparent";
    m_context.fill();
    branchCounter = 0;
    branch(w / 2, treeStart, arr, maxDepth, windConfig);
    drawLines(m_context);
    canvases[key] = m_canvas;
  }

  return canvases[key];
}

function getLeavesCanvas(wind, colors) {
  const key = parseInt(wind * 60);
  
  if (!leavesCanvases[key]) {
    let m_canvas = document.createElement("canvas");
    m_canvas.width = canvasTree.width;
    m_canvas.height = canvasTree.height;
    let m_context = m_canvas.getContext("2d");
    drawLeaves(m_context, colors);
    leavesCanvases[key] = m_canvas;
  }

  return leavesCanvases[key];
}

export function updateTree(windConfig, weatherConditions) {
  const { treeColor } = weatherConditions.tree;
  context.clearRect(0, 0, canvasTree.width, canvasTree.height);
  context.drawImage(getTreeCanvas(windConfig), 0, 0);
  treeColor &&
    context.drawImage(
      getLeavesCanvas(windConfig.windActual, weatherConditions.tree),
      0,
      0
    );
}
