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

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${month} ${hours}:${minutes}`;
}

let currentDate = new Date();
let h2 = document.querySelector("h2");
h2.innerHTML = formatDate(currentDate);

//Convert Celcius to Fahrenheit
function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsius);

//City Search Display
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputCity");
  let city = searchInput.value;

  let apiKey = "9b340dbdba6235146c64b6b9e4558596";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
  searchInput.value = " ";
}

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", searchCity);

//Weather API
function showWeather(response) {
  console.log(response.data);
  document.querySelector("p").innerHTML = response.data.name;
  document.querySelector("#mainTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feelLikeTemperature").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#temperatureHigh").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temperatureLow").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

//Geolocation API
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.latitude;
  let apiKey = "9b340dbdba6235146c64b6b9e4558596";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", currentPosition);
