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

function renderItems(city, data) {
  document.querySelector("#currentCity").innerHTML = city;

  document.querySelector("#day1Date").innerHTML = data.list[0].dt_txt;
  document.querySelector("#day1Description").innerHTML = data.list[0].weather[0].description;
  let kTemp = data.list[0].main.temp;
  let fTemp = ((kTemp - 273.15) * 9) / 5 + 32;
  document.querySelector("#day1Temp").innerHTML = fTemp;
  document.querySelector("#day1Humidity").innerHTML = data.list[0].main.humidity;

  document.querySelector("#day2Date").innerHTML = data.list[1].dt_txt;
  document.querySelector("#day2Description").innerHTML = data.list[1].weather[0].description;
  let kTemp2 = data.list[1].main.temp;
  let fTemp2 = ((kTemp2 - 273.15) * 9) / 5 + 32;
  document.querySelector("#day2Temp").innerHTML = fTemp2;
  document.querySelector("#day2Humidity").innerHTML = data.list[1].main.humidity;

  document.querySelector("#day3Date").innerHTML = data.list[2].dt_txt;
  document.querySelector("#day3Description").innerHTML = data.list[2].weather[0].description;
  let kTemp3 = data.list[2].main.temp;
  let fTemp3 = ((kTemp3 - 273.15) * 9) / 5 + 32;
  document.querySelector("#day3Temp").innerHTML = fTemp3;
  document.querySelector("#day3Humidity").innerHTML = data.list[2].main.humidity;

  document.querySelector("#day4Date").innerHTML = data.list[3].dt_txt;
  document.querySelector("#day4Description").innerHTML = data.list[3].weather[0].description;
  let kTemp4 = data.list[3].main.temp;
  let fTemp4 = ((kTemp4 - 273.15) * 9) / 5 + 32;
  document.querySelector("#day4Temp").innerHTML = fTemp4;
  document.querySelector("#day4Humidity").innerHTML = data.list[3].main.humidity;

  document.querySelector("#day5Date").innerHTML = data.list[4].dt_txt;
  document.querySelector("#day5Description").innerHTML = data.list[4].weather[0].description;
  let kTemp5 = data.list[4].main.temp;
  let fTemp5 = ((kTemp5 - 273.15) * 9) / 5 + 32;
  document.querySelector("#day5Temp").innerHTML = fTemp5;
  document.querySelector("#day5Humidity").innerHTML = data.list[4].main.humidity;
}

//Function calls
//event listeners
init();

//search button event listener
btnSearch.addEventListener("click", formSubmitHandler);

//click on past search results buttons

searchHistoryButtons.addEventListener("click", buttonClickHandler);
