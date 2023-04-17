//global variables

let btnSearch = document.querySelector("#btn-search");
let input = document.querySelector("#input");
let currentCity = document.querySelector("#currentCity");
let currentTemp = document.querySelector("#currentTemp");
let currentWind = document.querySelector("#currentWind");
let currentHumidity = document.querySelector("#currentHumidity");
let forecast = document.querySelector("#forecast");
let searchedCities = JSON.parse(localStorage.getItem("cities")) || [];
let searchHistoryButtons = document.querySelector("#searchHistoryButtons");
let forecastTitle = document.querySelector("#forecastTitle");
let cityCard = document.querySelector("#cityCard");

//Functions
function init() {
  // grab last search results from local storage & display on page
  if (searchedCities.length > 0) {
    let maximumLength = searchedCities.length >= 5 ? 5 : searchedCities.length;
    let count = 0;
    for (let i = searchedCities.length - 1; i >= 0; i--) {
      let cityHistoryButtons = document.createElement("button");
      cityHistoryButtons.setAttribute("data-city", searchedCities[i]);
      cityHistoryButtons.innerHTML = searchedCities[i];
      cityHistoryButtons.classList.add("w-full", "border-4", "border-blue", "rounded-lg", "my-3", "text-center");
      searchHistoryButtons.append(cityHistoryButtons);
      count++;
      if (count === maximumLength) {
        break;
      }
    }
  }
}

let formSubmitHandler = function (event) {
  event.preventDefault();
  search();
};

let buttonClickHandler = function (event) {
  let button = event.target;
  let cityChoice = button.getAttribute("data-city");
  if (cityChoice) {
    search(cityChoice);
  }
};

function search(cityChoice) {
  //set assign variable to value of the textbox on html page
  let city = input.value || cityChoice;
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=93b668edd750e775b29c9eba42d59928`;
  let cityHistory = input.value.trim();

  input.value = "";
  forecast.innerHTML = "";
  currentCity.innerHTML = "";

  if (!searchedCities.find((city) => city.toLowerCase() === cityHistory.toLower()) && cityHistory !== "") {
    searchedCities.push(cityHistory);
    localStorage.setItem("cities", JSON.stringify(searchedCities));
  }

  fetch(requestUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderItems(city, data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

//current weather
let date = dayjs(data.list[0].dt_txt).format("MMMM DD, YYYY");
let iconURL = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
let weatherIcon = document.createElement("img");
weatherIcon.setAttribute("src", iconURL);

currentCity.innnerHTML = `${data.city.name} (${date})`;
currentCity.append(weatherIcon);
currentTemp.innerHTML = `Temp: ${data.list[0].main.temp}° F`;
currentWind.innerHTML = `Wind: ${data.list[0].wind.speed} MPH`;
currentHumidity.innerHTML = `Humidity ${data.list[0].main.humidity}%`;

//5 day forecast

cityCardclassList.remove("hidden");
forecastTitle.innerHTML = "5 Day Forecast";

data.listforEach((day) => {
  let midnight = day.dt_txt.split(" ")[1];
  let date = dayjs(day.dt_txt).format("MMMM DD, YYYY");
  if (midnight === "00:00:00") {
    let dayCard = document.createElement("div");
    dayCard.innerHTML += `<h1 class="font-bold">${date}</h1>`;
    dayCard.innerHTML += `<img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">`;
    dayCard.innerHTML += `<div>Temp: ${day.main.temp}°</div>`;
    dayCard.innerHTML += `<div>Wind: ${day.wind.speed} MPH</div>`;
    dayCard.innerHTML += `<div>Humidity ${day.main.humidity}%</div>`;
    dayCard.classList.add("border-3", "boarder-blue", "rounded-lg", "p-2", "m-2", "bg-gradient-to-r", "from-purple-500", "to-teal-500", "text-black");
    forecast.append(dayCard);
  }
});

//Function calls
//event listeners
init();

//search button event listener
btnSearch.addEventListener("click", formSubmitHandler);

//click on past search results buttons

searchHistoryButtons.addEventListener("click", buttonClickHandler);
