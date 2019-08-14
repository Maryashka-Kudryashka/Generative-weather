export async function fetchWeather() {
  try {
    return await (await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=702550&appid=87e326e5f84b476049159e83bc4fda67`
    )).json();
  } catch (err) {
    console.log(err);
    return err;
  }
}
