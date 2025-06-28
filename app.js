const apiKey = "dde501687911f10a10d4dfaf63abbf86";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=metric&q=`;

const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
  try {
    if (city === "") {
      city = "New York"; // Default city if no input is provided
    }

    const res = await fetch(apiUrl + city);
    if (!res.ok) {
      throw new Error("City not found or server error");
    }

    const data = await res.json();

    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".wind").innerText = data.wind.speed + " km/h";

    const weatherCondition = data.weather[0].main;
    console.log(data.weather[0].main); // Log the weather condition for debugging

    switch (weatherCondition) {
      case "Clouds":
        weatherIcon.src = "assets/clouds.png";
        break;
      case "Rain":
        weatherIcon.src = "assets/rain.png";
        break;
      // case "Clear":
      //   weatherIcon.src = "assets/clear.png";
      //   break;
      case "Drizzle":
        weatherIcon.src = "assets/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "assets/mist.png";
        break;
      case "Snow":
        weatherIcon.src = "assets/snow.png";
        break;
      default:
        weatherIcon.src = "assets/clear.png"; // optional fallback
        break;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    document.querySelector(".city").innerText = "Not Found";
    document.querySelector(".temp").innerText = "--";
    document.querySelector(".humidity").innerText = "--";
    document.querySelector(".wind").innerText = "--";
  }
}

getWeather();

searchButton.addEventListener("click", () => {
  getWeather(searchInput.value);
});
