import { updateTree } from "./components/tree.js";
import { generateTree } from "./components/tree.js";
import { updateGrass } from "./components/grass.js";
import { generateGrass } from "./components/grass.js";
import { generateClouds } from "./components/clouds.js";
import { updateClouds } from "./components/clouds.js";
import { initClouds } from "./components/clouds.js";
import { updateSnowFall } from "./components/snow.js";
import { generateSnow } from "./components/snow.js";
import { updateRain } from "./components/rain.js";
import { generateRain } from "./components/rain.js"
import { updateWind } from "./components/wind.js";
import { generateWind } from "./components/wind.js";
import { weather } from "./weatherConfig.js";

window.addEventListener("load", async () => {
  var weatherConditions = await weather();

  generateWind(weatherConditions)
  generateClouds(weatherConditions);
  generateTree(weatherConditions);
  generateGrass(weatherConditions);
  weatherConditions.rain.isRain && generateRain(weatherConditions);
  weatherConditions.snow.isSnow && generateSnow(weatherConditions);

  function init(weatherConditions) {
    const from = -80;
    const to = 80;

    for (let i = from; i <= to; i++) {
      const windActual = i / 60;
      const windConfig = { windActual, windX: -1, windY: 0 };
      updateGrass(windConfig, weatherConditions);
    }

    for (let i = from; i <= to; i++) {
      const windActual = i / 60;
      const windConfig = { windActual, windX: -1, windY: 0 };
      updateTree(windConfig, weatherConditions);
    }
  }

  // init(weatherConditions);
  const loader = document.querySelector("#loader");
  if (loader) loader.style.display = "none";

  function update() {
    var windConfig = updateWind(weatherConditions);
    updateTree(windConfig, weatherConditions);
    updateGrass(windConfig, weatherConditions);
    updateClouds(weatherConditions);
    weatherConditions.snow.isSnow && updateSnowFall(windConfig);
    weatherConditions.rain.isRain && updateRain(windConfig);
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
});
