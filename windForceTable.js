export function windForceTable(wind) {
  if (wind <= 0.3) {
    return 0;
  }
  if (wind > 0.3 && wind <= 1) {
    return 1;
  }
  if (wind > 1 && wind <= 3) {
    return 2;
  }
  if (wind > 3 && wind <= 5) {
    return 3;
  }
  if (wind > 5 && wind <= 8) {
    return 4;
  }
  if (wind > 8 && wind <= 11) {
    return 5;
  }
  if (wind > 11 && wind <= 14) {
    return 6;
  }
  if (wind > 14 && wind <= 17) {
    return 7;
  }
  if (wind > 17 && wind <= 20) {
    return 8;
  }
  if (wind > 20 && wind <= 24) {
    return 9;
  }
  if (wind > 24 && wind <= 28) {
    return 10;
  }
  if (wind > 28 && wind <= 32) {
    return 11;
  }
  if (wind > 32) {
    return 12;
  }
}
