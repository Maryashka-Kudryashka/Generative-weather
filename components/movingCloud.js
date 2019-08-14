import { icons } from "../icons/icons.js";

export function cloud(type, windSpeed, isWinter) {
  const cloudsSizes = [
    {
      canvasWidth: 380,
      canvasHeight: 230,
      cloudMaxWidth: 230,
      cloudMinWidth: 110,
      cloudMaxHeight: 80,
      cloudMinHeight: 50
    },
    {
      canvasWidth: 450,
      canvasHeight: 300,
      cloudMaxWidth: 300,
      cloudMinWidth: 180,
      cloudMaxHeight: 150,
      cloudMinHeight: 120
    }
  ];

  const isCloudSmall = type == "small";

  const {
    canvasWidth,
    canvasHeight,
    cloudMaxWidth,
    cloudMinWidth,
    cloudMaxHeight,
    cloudMinHeight
  } = cloudsSizes[isCloudSmall ? 0 : 1];

  const speed = windSpeed *3;
  const radius = 10;

  const imgCloud = new Image();
  imgCloud.src = isCloudSmall ? icons.smallCloud : icons.cloud;

  const imgInnerCloud = new Image();
  if (isWinter) {
    imgInnerCloud.src = isCloudSmall ? icons.winterInner : icons.bigWinterInner;
  } else {
    imgInnerCloud.src = isCloudSmall ? icons.smallInnerCloud : icons.innerCloud;
  }

  const cloudWidth = random(cloudMinWidth, cloudMaxWidth);
  const cloudHeight = random(cloudMinHeight, cloudMaxHeight);

  const canvases = {};

  let clouds = generateClounds(cloudWidth, cloudHeight);
  let innerClouds = generateInnerClouds(cloudWidth, cloudHeight);

  let frame = 0;

  function random(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
  }

  function generateClounds(cloudWidth, cloudHeight) {
    const clouds = [];
    for (var i = 0; i < 25; i++) {
      var x = random(radius * 2, cloudWidth);
      var y = random(radius * 2, cloudHeight);
      clouds.push([x, y, random(0, 360), x - radius, y]);
    }

    return clouds;
  }

  function generateInnerClouds(cloudWidth, cloudHeight) {
    const innerClouds = [];

    for (var i = 0; i < 20; i++) {
      var x = random(40, 30 + cloudWidth);
      var y = random(isCloudSmall ? 40 : 100, 30 + cloudHeight);
      innerClouds.push([x, y, random(0, 360), x - radius, y]);
    }

    return innerClouds;
  }

  function recalculateCloudPosition([x, y, s, x2, y2]) {
    return [x, y, s + speed, x2, y2];
  }

  function drawCloud([x, y, s, x2, y2], img, context) {
    var newX = radius * Math.cos(s * (Math.PI / 180));
    var newY = radius * Math.sin(s * (Math.PI / 180));

    x = newX + x2;
    y = newY + y2;

    context.drawImage(img, x, y);
  }

  function getCloudCanvas(frame) {
    if (!canvases[frame]) {
      var newCanvas = document.createElement("canvas");
      newCanvas.width = canvasWidth;
      newCanvas.height = canvasHeight;
      var newContext = newCanvas.getContext("2d");


      clouds.forEach(el => drawCloud(el, imgCloud, newContext));
      innerClouds.forEach(el => drawCloud(el, imgInnerCloud, newContext));

      clouds = clouds.map(recalculateCloudPosition);
      innerClouds = innerClouds.map(recalculateCloudPosition);

      // newContext.strokeRect(0, 0, newCanvas.width, newCanvas.height);
      canvases[frame] = newCanvas;
    }

    return canvases[frame];
  }

  return function() {
    const cloud = getCloudCanvas(frame);
    // frame =  type == "small" ? 0 : (frame + speed) % 360;
    frame = (frame + speed) % 360;

    return cloud;
  };
}
