export function scatteredCloud(type) {
  const cloudsSizes = [
    {
      canvasWidth: 300,
      canvasHeight: 150,
      cloudMaxWidth: 150,
      cloudMinWidth: 100,
      cloudMaxHeight: 30,
      cloudMinHeight: 20
    },
    {
      canvasWidth: 300,
      canvasHeight: 150,
      cloudMaxWidth: 200,
      cloudMinWidth: 100,
      cloudMaxHeight: 50,
      cloudMinHeight: 40
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

  const radius = isCloudSmall ? 20 : 30;
  const deviation = isCloudSmall ? 10 : 15;
  const cloudWidth = random(cloudMinWidth, cloudMaxWidth);
  const cloudHeight = random(cloudMinHeight, cloudMaxHeight);
  var savedCanvas = false;
  let clouds = generateClounds(cloudWidth, cloudHeight);
  let innerClouds = generateInnerClouds(cloudWidth, cloudHeight);

  function random(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
  }

  function generateClounds(cloudWidth, cloudHeight) {
    const clouds = [];
    for (var i = 0; i < 15; i++) {
      var x = random(
        (canvasWidth - cloudWidth) / 2,
        (canvasWidth - cloudWidth) / 2 + cloudWidth
      );
      var y = random(
        (canvasHeight - cloudHeight) / 2,
        (canvasHeight - cloudHeight) / 2 + cloudHeight
      );
      clouds.push([x, y]);
    }
    return clouds;
  }

  function generateInnerClouds(cloudWidth, cloudHeight) {
    const innerClouds = [];
    for (var i = 0; i < 10; i++) {
      var x = random(
        (canvasWidth - cloudWidth) / 2 + 20,
        (canvasWidth - cloudWidth) / 2 + cloudWidth + 25
      );
      var y = random(
        (canvasHeight - cloudHeight) / 2 + 30,
        (canvasHeight - cloudHeight) / 2 + cloudHeight + 25
      );
      innerClouds.push([x, y]);
    }
    return innerClouds;
  }

  function drawCloud([x, y], context) {
    context.beginPath();
    var gr = context.createRadialGradient(x, y, 0, x, y, radius);
    gr.addColorStop(0, "white");
    gr.addColorStop(1, "rgba(255, 255, 255, 0)");
    context.beginPath();
    context.rect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = gr;
    context.fill();
    context.closePath();
  }

  function drawInnerCloud([x, y], context) {
    context.beginPath();
    var gr = context.createRadialGradient(
      x,
      y,
      0,
      x - deviation,
      y - deviation,
      radius
    );
    gr.addColorStop(0, "#ccd5e5");
    // gr.addColorStop(0, "#d9dbdd");
    gr.addColorStop(1, "rgba(255, 255, 255, 0)");
    context.beginPath();
    context.rect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = gr;
    context.fill();
    context.closePath();
  }

  function getCloudCanvas() {
    if (!savedCanvas) {
      var newCanvas = document.createElement("canvas");
      newCanvas.width = canvasWidth;
      newCanvas.height = canvasHeight;
      var newContext = newCanvas.getContext("2d");
      clouds.forEach(el => drawCloud(el, newContext));
      innerClouds.forEach(el => drawInnerCloud(el, newContext));
      savedCanvas = newCanvas;
    }
    return savedCanvas;
  }

  return function() {
    const cloud = getCloudCanvas();
    return cloud;
  };
}
