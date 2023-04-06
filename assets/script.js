//global variables
//divs on other side of HTML
let btnSearch = document.querySelector("#btn-search");
let requestUrl = [];

//Functions
function init() {
  // grab last search results from local storage & display on page
}

function search() {
  //set assign variable to value of the textbox on html page
  let city = "Chicago";
  alert("Hello");
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=93b668edd750e775b29c9eba42d59928`;
  fetch(requestUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      renderItems(city, data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function renderItems(city, data) {
  document.querySelector("#currentCity").innerHTML = city;
  document.querySelector("#day1Date").innerHTML = data.list[0].dt_txt;
  document.querySelector("#day1Description").innerHTML = data.list[0].weather[0].description;
  let kTemp = data.list[0].main.temp;
  let fTemp = ((kTemp - 273.15) * 9) / 5 + 32;
  document.querySelector("#day1Temp").innerHTML = fTemp;
}

//Function calls
//event listeners
init();

//search button event listener
btnSearch.addEventListener("click", search);

//click on past search results buttons
