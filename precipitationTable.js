export function rainTable(id, type) {
  if (type == "Drizzle") {
    if (id < 310) {
      return 300;
    } else if (id > 312) {
      return 1500;
    } else {
      return 700;
    }
  }
  if (type == "Rain") {
    if (id < 504) {
      return 300;
    } else if (id > 520) {
      return 1500;
    } else {
      return 700;
    }
  }
}

export function snowTable(id) {
  if (id < 611) {
    return 300;
  } else if (id > 602 && id < 615) {
    return 500;
  } else if (id > 620) {
    return 1000;
  } else {
    return 700;
  }
}
