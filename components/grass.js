var canvas = document.getElementById("grass"),
  ctx = canvas.getContext("2d"),
  w = window.innerWidth,
  h = window.innerHeight;

canvas.width = w;
canvas.height = h;
const canvases = {};
let dots = [];
var units;
const dryGrassHeight = 70;
const dryGrassWidth = 1;

const octoberGrass = [
  ["#ccb897", "#d6be94", "#e7cfa5"],
  ["#b5986c", "#cfb285", "#dfc59a"],
  ["#a68e5e", "#b19063", "#c5ad81"],
  ["#897248", "#a68a58", "#c1a878"],
  ["#5c4e2c", "#977a45", "#c7a77d"],
  ["#4a391a", "#987a4c", "#d9bd8f"]
];
// const freshGrassWidth = 5;

function random(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

function divide(min = 0, max, units, n) {
  return Math.floor((n - min) / ((max - min) / units));
}

export function generateGrass(weatherConditions) {
  const { month } = weatherConditions;
  const { grassColor, grassType } = weatherConditions.grass;
  const { isSnow } = weatherConditions.snow;
  if (isSnow) {
    units = w * 1.5;
  } else if (month == 9) {
    units = w * 4;
  } else {
    units = w * 3.5;
  }

  for (var i = 0; i < units; i++) {
    var y = random(h - 170, h + 40);
    const isDry = random(1, 100) > grassType;
    var x = random(isDry ? 0 - 40 : 0, w);
    var colorGroup = Math.min(divide(h - 171, h + 41, 6, y), 5);
    var colors = isDry ? octoberGrass[colorGroup] : grassColor[colorGroup];
    var color = colors[random(0, colors.length - 1)];
    var angleGroup = divide(h - 170, h + 41, 10, y);
    if (isDry) {
      var angle = random(50 - angleGroup * 5, 60);
    } else if (month == 2) {
      var angle = random(-5, 5);
    } else if (month == 3) {
      var angle = random(-10, 10);
    } else {
      var angle = random(-15, 15);
    }
    var speed = random(0, 3);
    dots.push([x, y, color, angle, speed, isDry]);
  }

  dots = dots.slice(0).sort((a, b) => a[1] - b[1]);
}

function drawGrass(context, windConfig, weatherConditions) {
  const wind = windConfig.windActual;
  const { width, height } = weatherConditions.grass.grassSize;
  dots.forEach(([x, y, fill, angle, speed, isDry]) => {
    if (isDry) {
      const x1Dev = x - wind * speed + angle / 2;
      const y1Dev = y - dryGrassHeight / 2;
      const x2Dev = x - dryGrassWidth - wind * speed + angle / 2;
      const y2Dev = y - dryGrassHeight / 1.8;
      const x1 = x - dryGrassWidth + wind * speed * 2 + angle;
      const y1 = y - dryGrassHeight + Math.abs(wind * speed + angle);
      const x2 = x - dryGrassWidth * 2;

      context.beginPath();
      context.fillStyle = fill;
      context.moveTo(x, y);
      context.quadraticCurveTo(x1Dev, y1Dev, x1, y1);
      context.quadraticCurveTo(x2Dev, y2Dev, x2, y);
      context.closePath();
      context.fill();
    } else {
      const x1Dev = x - wind * speed + angle;
      const y1Dev = y - height / 2;
      const x2Dev = x - width - wind * speed + angle;
      const y2Dev = y - height / 2;
      const x1 = x - width / 2 + wind * speed * 2 + angle;
      const y1 = y - height + Math.abs(wind * speed + angle);
      const x2 = x - width;

      context.beginPath();
      context.fillStyle = fill;
      context.moveTo(x, y);
      context.quadraticCurveTo(x1Dev, y1Dev, x1, y1);
      context.quadraticCurveTo(x2Dev, y2Dev, x2, y);
      context.closePath();
      context.fill();
    }
  });
}

function getGrassCanvas(windConfig, weatherConditions) {
  const { grassType } = weatherConditions.grass;
  const { isSnow } = weatherConditions.snow;
  const key = parseInt(windConfig.windActual * 60);
  if (!canvases[key]) {
    var m_canvas = document.createElement("canvas");
    m_canvas.width = canvas.width;
    m_canvas.height = canvas.height;
    var m_context = m_canvas.getContext("2d");
    m_context.beginPath();
    m_context.rect(0, h - 170, w, 450);
    if (isSnow) {
      var grd = m_context.createLinearGradient(150, h - 170, 150, h);
      grd.addColorStop(0.0, "white");
      grd.addColorStop(1.0, "#e0e3f2");
      m_context.fillStyle = grd;
    } else if (grassType > 90) {
      m_context.fillStyle = "#71775b";
    } else {
      m_context.fillStyle = "#a5956d";
    }
    m_context.fill();
    drawGrass(m_context, windConfig, weatherConditions);
    canvases[key] = m_canvas;
  }
  return canvases[key];
}

export function updateGrass(windConfig, weatherConditions) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(getGrassCanvas(windConfig, weatherConditions), 0, 0);
}
