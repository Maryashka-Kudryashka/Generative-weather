var canvas = document.getElementById("rain");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;
ctx.strokeStyle = "rgba(195, 207, 226,0.5)";
ctx.lineCap = "round";
var particles = [];

export function generateRain(weatherConditions) {
  const { weather } = weatherConditions;
  if (weather == "Rain") {
    ctx.lineWidth = 1;
  } else {
    ctx.lineWidth = 0.7;
  }
  var maxParts = weatherConditions.rain.precipitationAmount;
  for (var a = 0; a < maxParts; a++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      l: Math.random() * 1,
      xs: -4 + Math.random() * 4 + 2,
      ys: Math.random() * 10 + 10
    });
  }
}

function draw(windConfig) {
  ctx.clearRect(0, 0, w, h);
  for (var c = 0; c < particles.length; c++) {
    var p = particles[c];
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + p.l * p.xs + windConfig.windActual, p.y + p.l * p.ys);
    ctx.stroke();
  }
  move(windConfig);
}

function move(windConfig) {
  for (var b = 0; b < particles.length; b++) {
    var p = particles[b];
    p.x += p.xs + windConfig.windActual * 5;
    p.y += p.ys;
    if (p.x > w || p.y > h) {
      p.x = Math.random() * w;
      p.y = -20;
    }
  }
}

export function updateRain(windConfig) {
  draw(windConfig);
}
