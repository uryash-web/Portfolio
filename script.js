console.log("Javascript Connected");
const themeButton = document.getElementById("themeToggle");

if (themeButton) {
  themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      themeButton.textContent = "Switch to Light Mode";
    } else {
      themeButton.textContent = "Switch to Dark Mode";
    }
  });
}

const cityInput = document.getElementById("cityInput");
const weatherButton = document.getElementById("weatherButton");
const weatherResult = document.getElementById("weatherResult");

if (weatherButton) {
  weatherButton.addEventListener("click", getWeather);
}

async function getWeather() {
  if (!cityInput) return;
  const city = cityInput.value.trim();

  if (!city) {
    if (weatherResult) weatherResult.textContent = "Please enter a city.";
    return;
  }

  if (weatherResult) weatherResult.textContent = "Loading weather...";

  const apiKey = "5c7b60c5d6abd9cb73639a1cba0fce7a";

  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (weatherResult) {
      weatherResult.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Condition: ${data.weather[0].description}</p>
      `;
    }
  } catch (error) {
    if (weatherResult) {
      weatherResult.textContent =
        "Unable to fetch weather. Please try again.";
    }
    console.error(error);
  }
}
