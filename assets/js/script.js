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
var current = document.getElementById("currentContainer")
var forecast = document.getElementById("forecastContainer")
const Icon = document.getElementById("icon");
const currentTemp = document.getElementById("temp");
const currentHumidity = document.getElementById("humidity"); 4
const currentWind = document.getElementById("windSpeed");
const currentUV = document.getElementById("UV");
const history = document.getElementById("history");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);

function getWeather(cityName) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
    axios.get(queryURL)
    .then(function(response){
        console.log(response);
})
}