"use strict";

const searchBox = document.querySelector(".search-box");
const city = document.querySelector(".city");
const date = document.querySelector(".date");
const temperature = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const highLow = document.querySelector(".hi-low");
const api = {
  key: apiKey,
  url: "http://api.openweathermap.org/data/2.5/",
};

//UPDATE DATE
const setDate = function () {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var curDate = new Date().toLocaleDateString("en-IN", options);
  const idx = curDate.lastIndexOf(",");
  curDate = curDate.slice(0, idx) + curDate.slice(idx + 1);
  date.textContent = curDate;
};
setDate();

// get results from weather API
const getResults = async function (location) {
  const result = await fetch(
    `${api.url}weather?q=${location}&units=metric&APPID=${api.key}`
  );
  if (result.status !== 200) {
    console.log(alert("Place Not Found"));
    searchBox.value = "";
    return;
  }
  const data = await result.json();
  displayResults(data);
};

// updats the content of the page
const displayResults = function (data) {
  console.log(data);
  city.innerText = `${data.name} , ${data.sys.country}`;
  setDate();
  console.log(data.weather.main);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weather.textContent = `${data.weather[0].main}`;
  highLow.textContent = `${Math.round(data.main.temp_min)}°c / ${Math.round(
    data.main.temp_max
  )}°c`;
  searchBox.value = "";
};

searchBox.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
});
