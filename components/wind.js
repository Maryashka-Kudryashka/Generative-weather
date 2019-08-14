const windX = -1; // wind direction vector
const windBranchSpring = 0.98; // the amount and speed of the branch spring back
const windY = 0;
var windCycle = 0;
var windCycleGust = 0;
var windCycleGustTime = 0;
var currentWind = 0;
var windFollow = 0;
var windActual = 0;

var windBendRectSpeed;
// how fast the tree reacts to the wing
var gustProbability; 
// how often there is a gust of wind, max 5 and min 0.5

function valueTransformer(aFrom, aTo, bFrom, bTo, aVal) {
  const percentage = ((aVal - aFrom) * 100) / (aTo - aFrom);
  const bVal = (percentage * (bTo - bFrom) / 100) + bFrom; 
  return bVal;
}

export function generateWind(weatherConditions) {
  const { wind } = weatherConditions;
  windBendRectSpeed = valueTransformer(0, 12, 0.001, 0.05, wind);
  gustProbability = valueTransformer(0, 12, 0.5, 5, wind) / 100;
}

export function updateWind() {
  if (Math.random() < gustProbability) {
    windCycleGustTime = (Math.random() * 10 + 1) | 0;
  }
  if (windCycleGustTime > 0) {
    windCycleGustTime--;
    windCycleGust += windCycleGustTime / 20;
  } else {
    windCycleGust *= 0.99;
  }
  windCycle += windCycleGust;
  currentWind = (Math.sin(windCycle / 40) * 0.6 + 0.4) ** 2;
  currentWind = currentWind < 0 ? 0 : currentWind;
  windFollow += (currentWind - windActual) * windBendRectSpeed;
  windFollow *= windBranchSpring;
  windActual += windFollow;
  // windActual = Math.max(0, windActual);
  return { windActual, windX, windY };
}
