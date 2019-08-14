import { cloud } from "./movingCloud.js";
import { scatteredCloud } from "./scatteredCloud.js";

var c = document.getElementById("clouds");
const ctx = c.getContext("2d");

const w = window.innerWidth;
const h = window.innerHeight;
const skyHeight = h - 170;
c.width = w;
c.height = h;
var smallClouds;
var bigClouds;
var scatteredClouds;
var scatteredSmallClouds;
const cloudWidth = 350;
const cloudHeight = 200;

var canvases = {
  first: 0,
  second: 0
};

var kk = 0;
var ll = -w;

function random(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

export function generateClouds(weatherConditions) {
  const { cloudsAmount, wind } = weatherConditions.sky;
  const isWinter = weatherConditions.snow.isSnow;

  bigClouds = generateSpecificClouds(
    cloudsAmount,
    true,
    "big",
    0 - cloudHeight / 2,
    cloudHeight / 10,
    wind,
    isWinter
  );
  smallClouds = generateSpecificClouds(
    cloudsAmount * 1.5,
    true,
    "small",
    skyHeight / 6,
    skyHeight / 2,
    wind,
    isWinter
  );
  scatteredClouds = generateSpecificClouds(
    cloudsAmount * 2,
    false,
    "big",
    skyHeight / 2,
    skyHeight / 1.5,
    isWinter
  );
  scatteredSmallClouds = generateSpecificClouds(
    cloudsAmount * 2.5,
    false,
    "small",
    skyHeight / 1.5,
    skyHeight - cloudHeight / 1.2,
    isWinter
  );
}

function generateSpecificClouds(amount, moveble, size, start, end, wind, isWinter) {
  const clouds = [];
  for (let i = 0; i <= amount; i++) {
    const getCloudCanvasFn = moveble
      ? cloud(size, wind, isWinter)
      : scatteredCloud(size);
    const startinPosX = random(-cloudWidth, w);
    const startinPosY = random(start, end);
    clouds.push([getCloudCanvasFn, startinPosX, startinPosY]);
  }
  return clouds;
}

function updateCloud(cloud, wind) {
  const [fn, x, y] = cloud;
  let newX = x + wind;
  if (newX > w + wind) {
    newX = -cloudWidth;
  }
  return [fn, newX, y];
}

function updateLayer(x, wind) {
  let newX = x + wind;
  if (newX > w + wind) {
    newX = -x;
  }
  return newX;
}

function drawCloud(cloud, context) {
  const [getCloudCanvas, x, y] = cloud;
  const cloudCanvas = getCloudCanvas();
  context.drawImage(cloudCanvas, Math.floor(x), Math.floor(y));
}

function getLayerCanvas(clouds, type) {
  if (!canvases.type) {
    let m_canvas = document.createElement("canvas");
    m_canvas.width = c.width;
    m_canvas.height = c.height;
    let m_context = m_canvas.getContext("2d");
    clouds.forEach(cloud => drawCloud(cloud, m_context));
    canvases[type] = m_canvas;
  }
  return canvases[type]
}

export function initClouds(weatherConditions) {
  const { wind } = weatherConditions.sky;
  const cloudLimit = Math.ceil(360 / wind);

  for (let i = 0; i <= cloudLimit; i++) {
    bigClouds.forEach(cloud => drawCloud(cloud, ctx));
    bigClouds = bigClouds.map(cloud => updateCloud(cloud, wind));
  }
}

export function updateClouds(weatherConditions) {
  const { skyColor, wind } = weatherConditions.sky;
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.rect(0, 0, w, 550);
  var grd = ctx.createLinearGradient(150, 0, 150, skyHeight);
  grd.addColorStop(0.0, skyColor[0]);
  grd.addColorStop(1.0, skyColor[1]);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, skyHeight);


  // kk = updateLayer(kk, 0.2)
  // ll = updateLayer(ll, 0.2)
  // ctx.drawImage(getLayerCanvas(scatteredSmallClouds, "first"), kk, 0)
  // ctx.drawImage(getLayerCanvas(scatteredSmallClouds, "first"), ll, 0)

  // ctx.drawImage(getLayerCanvas(scatteredClouds, "second"), kk, 0)
  // ctx.drawImage(getLayerCanvas(scatteredClouds, "second"), ll, 0)

  scatteredSmallClouds.forEach(cloud => drawCloud(cloud, ctx));
  scatteredClouds.forEach(cloud => drawCloud(cloud, ctx));
  smallClouds.forEach(cloud => drawCloud(cloud, ctx));
  bigClouds.forEach(cloud => drawCloud(cloud, ctx));


  scatteredSmallClouds = scatteredSmallClouds.map(cloud =>
    updateCloud(cloud, wind/10)
  );
  scatteredClouds = scatteredClouds.map(cloud =>
    updateCloud(cloud, wind / 5)
  );

  smallClouds = smallClouds.map(cloud => updateCloud(cloud, wind / 2));
  bigClouds = bigClouds.map(cloud => updateCloud(cloud, wind));
}
