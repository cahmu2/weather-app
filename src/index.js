let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDay = document.querySelector("#date");
currentDay.innerHTML = `${day}<br />${hours}:${minutes}`;

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  let humidityOutcome = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${humidityOutcome}%`;
  let windOutcome = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${windOutcome}m/s`;
  document.querySelector("#feels").innerHTML = Math.round(
    response.data.main.feels_like
  );
}

function searchCity(city) {
  let apiKey = "ddcd06fd9c6e46be8cc70a90e4ca600a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function submitCityResult(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function showPosition(position) {
  let apiKey = "ddcd06fd9c6e46be8cc70a90e4ca600a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", getCurrentLocation);

let enterCity = document.querySelector("#search-form");
enterCity.addEventListener("submit", submitCityResult);

searchCity("Brisbane");
