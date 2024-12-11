const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const weatherDisplay = document.getElementById("weather-display");
const errorMessage = document.getElementById("error-message");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const weatherIcon = document.getElementById("weather-icon");

const API_KEY = "55a50dc022ee87cf8954fd28f8fbac66"; // Replace with your OpenWeatherMap API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    errorMessage.classList.add("hidden");
    weatherDisplay.classList.add("hidden");

    const response = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    // Update the weather display
    cityName.textContent = `Weather in ${data.name}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Description: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    weatherDisplay.classList.remove("hidden");
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  }
});


