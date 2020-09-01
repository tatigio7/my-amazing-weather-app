// Date Feature
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[date.getMonth()];
  let dates = date.getDate();

  return `${day}, ${month} ${dates} ${formatHours(timestamp)}`;
}

let currentDate = new Date();
let h2 = document.querySelector("h2");
h2.innerHTML = formatDate(currentDate);

//
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//Display Weather Forecast
function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;

  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
   <ul class="col-2">
      <li>
        ${formatHours(forecast.dt * 1000)}
      </li>
      <li>
        <img src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" 
         alt="" 
        />
      </li>
      <li class="forecast-temperature">
        <span id="forecastTempMax">
        ${Math.round(forecast.main.temp_max)}° 
        &#124; 
        <span id="forecastTempMin">
        ${Math.round(forecast.main.temp_min)}°
      </li>
    </ul>
  `;
  }
}

//City Search Display
function search(city) {
  let apiKey = "9b340dbdba6235146c64b6b9e4558596";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputCity");

  search(searchInput.value);
}
search("Los Angeles");

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", handleSubmit);

//Weather API
function showWeather(response) {
  celsiusTemperature = response.data.main.temp;
  feelsLikeTemperature = response.data.main.feels_like;
  temperatureHigh = response.data.main.temp_max;
  temperatureLow = response.data.main.temp_min;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#mainTemperature").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feelLikeTemperature").innerHTML = Math.round(
    feelsLikeTemperature
  );
  document.querySelector("#temperatureHigh").innerHTML = Math.round(
    temperatureHigh
  );
  document.querySelector("#temperatureLow").innerHTML = Math.round(
    temperatureLow
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#sunrise").innerHTML = formatHours(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset").innerHTML = formatHours(
    response.data.sys.sunset * 1000
  );

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//Geolocation API
function showPosition(position) {
  let apiKey = "9b340dbdba6235146c64b6b9e4558596";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", getCurrentPosition);

//Convert Celcius to Fahrenheit
function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#mainTemperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  let feelsLikeElement = document.querySelector("#feelLikeTemperature");
  let feelsLikeTemp = (feelsLikeTemperature * 9) / 5 + 32;
  feelsLikeElement.innerHTML = `${Math.round(feelsLikeTemp)}`;

  let highTempElement = document.querySelector("#temperatureHigh");
  let highTemp = (temperatureHigh * 9) / 5 + 32;
  highTempElement.innerHTML = `${Math.round(highTemp)}`;

  let lowTempElement = document.querySelector("#temperatureLow");
  let lowTemp = (temperatureLow * 9) / 5 + 32;
  lowTempElement.innerHTML = `${Math.round(lowTemp)}`;

  let forecastHighElement = document.querySelectorAll("#forecastTempMax");
  forecastHighElement.forEach(function (high) {
    let forecastHighTemp = high.innerHTML;
    high.innerHTML = `${Math.round(forecastHighTemp * 9) / 5 + 32}`;
  });
}

function convertCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#mainTemperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let feelsLikeElement = document.querySelector("#feelLikeTemperature");
  feelsLikeElement.innerHTML = `${Math.round(feelsLikeTemperature)}`;

  let highTempElement = document.querySelector("#temperatureHigh");
  highTempElement.innerHTML = `${Math.round(temperatureHigh)}`;

  let lowTempElement = document.querySelector("#temperatureLow");
  lowTempElement.innerHTML = `${Math.round(temperatureLow)}`;

  let forecastLowElement = document.querySelectorAll("#forecastTempMin");
  forecastLowElement.forEach(function (low) {
    let forecastLowTemp = low.innerHTML;
    low.innerHTML = `${Math.round(forecastLowTemp)}`;
  });
}

let celsiusTemperature = null;
let feelsLikeTemperature = null;
let highTemperature = null;
let lowTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsius);
