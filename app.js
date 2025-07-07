const apiKey = "dde501687911f10a10d4dfaf63abbf86";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=metric&q=`;

const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

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

    console.log(data);

    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".wind").innerText = data.wind.speed + " km/h";

    if (data.weather[0].main === "Clouds") {
      document.body.style.backgroundImage = "url('clouds.jpg')";
    }
    console.log(data.weather[0].main);
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
