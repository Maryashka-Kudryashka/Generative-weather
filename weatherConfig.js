import { treeColors } from "./colorsPalette.js";
import { skyColors } from "./colorsPalette.js";
import { grassColors } from "./colorsPalette.js";
import { grassTypes } from "./colorsPalette.js";
import { leavesSizes } from "./sizesPalette.js";
import { grassSizes } from "./sizesPalette.js";
import { fetchWeather } from "./api.js";
import { windForceTable } from "./windForceTable.js";
import { rainTable, snowTable } from "./precipitationTable.js";

const cloudsMaxSpeed = 3;

function valueTransformer(aFrom, aTo, bFrom, bTo, aVal) {
  const percentage = ((aVal - aFrom) * 100) / (aTo - aFrom);
  const bVal = (percentage * (bTo - bFrom)) / 100 + bFrom;
  return bVal;
}

export async function weather() {
  const weatherApi = true;
  const weatherInfo = await fetchWeather();
  console.log(weatherInfo);
  const weather = weatherInfo.weather[0];
  const month = new Date().getMonth();
  // const month = 0;
  const actualWind = windForceTable(weatherInfo.wind.speed);
  const wind = valueTransformer(0, 12, 0, cloudsMaxSpeed, actualWind);
  const cloudsAmount = weatherInfo.clouds
    ? valueTransformer(0, 100, 0, 15, weatherInfo.clouds.all)
    : 0;
  const cloudy =
    (weatherInfo.clouds && weatherInfo.clouds.all > 85) ||
    weather.main == "Rain" ||
    weather.main == "Drizzle";
  const treeColor = treeColors[month].cloudy
    ? cloudy
      ? treeColors[month].cloudy
      : treeColors[month].sunny
    : 0;
  var skyColor;
  const isSnow = weather.main == "Snow";
  if (isSnow) {
    skyColor = skyColors.snow;
  } else {
    skyColor = cloudy ? skyColors.cloudy : skyColors.sunny;
  }
  const grassColor = grassColors[month];
  const leavesSize = leavesSizes[month] ? leavesSizes[month] : 0;
  const grassSize = grassSizes[month];
  const grassType = grassTypes[month];
  const finalWeather = weatherApi
    ? {
        wind,
        month,
        weather: weather.main,
        sky: {
          cloudsAmount,
          skyColor,
          wind: wind / 4
        },
        rain: {
          isRain: weather.main == "Drizzle" || weather.main == "Rain",
          precipitationAmount: rainTable(weather.id, weather.main)
        },
        tree: {
          treeColor,
          leavesSize
        },
        grass: {
          grassSize,
          grassColor,
          grassType
        },
        snow: {
          isSnow,
          snowAmount: snowTable(weather.id)
        }
      }
    : {
        wind: 0.5,
        month,
        weather: "Sunny",
        sky: {
          cloudsAmount: 7,
          skyColor: skyColors.cloudy,
          wind: 1.5/4
        },
        rain: {
          isRain: false,
          precipitationAmount: 500
        },
        tree: {
          treeColor,
          leavesSize
        },
        grass: {
          grassSize,
          grassColor,
          grassType
        },
        snow: {
          isSnow: false,
          snowAmount: 500
        }
      };

  return finalWeather;
}
