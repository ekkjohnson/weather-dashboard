//nav bar
//side column with search bar and cities listed
//main display box with loaded information for today
//date, temp, wind, humidity, and color coded UV index
//5 display boxes with weather for 5 days ahead
// date, icon, temp wind huminity

//search form
//api with cities and weather
//search history

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const APIkey = "c9a9ed03a355403f4cb9a36e931c0b4a";
var city;
var lonLat = []
var cityInput = document.getElementById("cityInput");
var searchBtn = document.getElementById("searchBtn");
var currentWeather = document.getElementById("currentContainer")
var forecast = document.getElementById("forecastContainer")
var history = document.getElementById("history");
var apiKey = "844421298d794574c100e3409cee0499"
var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);


//display weather 

//call
var formSumbit= function(event){
    event.preventDefault();
    var city = cityInput.value.trim();
    if(city){
        getcurrentWeather(city);
        getforecast(city);
        cities.unshift({city});
        cityInput.value = "";
    } else{
        alert("Please enter a City");
    }
    saveSearch();
    pastSearch(city);
}

var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};

var getcurrentWeather = function(city){
    

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};
var displayWeather=function(weather, citySearch){
    currentWeather.textContent="";
    cityInput.textContent=citySearch;
    // console.log(weather);

}

var currentDay=document.createElement("span")
currentDay.textContent="("+ moment(weather.dt.value).format ("MMM D, YYYY") + ") ";
citySearch.appendChild(currentDay);

function currentForecast() {
    removeAllChildNodes(currentWeather);
    removeAllChildNodes(forecast)
    var iconUrl = `http://openweathermap.org/img/wn/${forecast[0].weather[0].icon}@2x.png`;
    var Icon;
    fetch(iconUrl).then(function (res) {
      Icon = res.url;
      return Icon;
    });
    var card = document.createElement("div");
    currentContainer.appendChild(card);
    card.setAttribute("class", "currentWeatherCard");
    var city = document.createElement("h2");
    var date = document.createElement("h2");
    var icon = document.createElement("img");
    var temp = document.createElement("h2");
    var wind = document.createElement("h2");
    var humidity = document.createElement("h2");
    var UV= document.createElement("h2");
}