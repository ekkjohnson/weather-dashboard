//nav bar
//side column with search bar and cities listed
//main display box with loaded information for today
//date, temp, wind, humidity, and color coded UV index
//5 display boxes with weather for 5 days ahead
// date, icon, temp wind huminity

//search form
//api with cities and weather
//search history
// var city;
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const APIkey = "371075399ab3c5eb96abdb927a36cf0f";

var cityInput = document.getElementById("cityInput");
var searchBtn = document.getElementById("searchBtn");
var currentWeather = document.getElementById("currentContainer")
var forecast = document.getElementById("forecastContainer")
var history = document.getElementById("history");
var weather = 'https://api.openweathermap.org/data/2.5/onecall?'
var getLat = "lat=" + lat
var getLon = "&lon=" + lon
var rest = "&units=imperial&limit=1&appid="


// display weather 

call
function getAPI()
var requestURL= `${weather}lat=${getLat}&lon=${getLon}&exclude={part}&appid=${APIkey}`;

fetch(requestURL)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data)
})
getAPI();
searchBtn.addEventListener("click", function(){
    getCityCoordinates(cityInput)
    getWeather(cityCoordinates)
})
function getCityCoordinates (city) { 
    var cityCoordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}`
    var rest = "&limit=1&appid="
 
    fetch(cityCoordinates + city + rest + APIkey)
    .then(function(response){
        response.json()
        .then(function(data) {
            getWeather(data[0].lon,data[0].lat)
            forecast(data[0].lon,data[0].lat)
        })
    })
 
 }
 
 function getWeather(lon, lat) {
   
 
     fetch(weather + getLat + getLon + rest + APIkey)
    .then(function(response){
        response.json()
        .then(function(data) {
            console.log(data)
        })
    })
 }


var displayWeather=function(weather, citySearch){
    currentWeather.textContent="";
    cityInput.textContent=citySearch;
    console.log(weather);

}


// var currentDay=document.createElement("span")
// currentDay.textContent="("+ moment(currentWeather.dt.value).format ("MMM D, YYYY") + ") ";
// citySearch.appendChild(currentDay);

// function currentForecast() {
//     removeAllChildNodes(currentWeather);
//     removeAllChildNodes(forecast)
//     var iconUrl = `http://openweathermap.org/img/wn/${forecast[0].weather[0].icon}@2x.png`;
//     var Icon;
//     fetch(iconUrl).then(function (res) {
//       Icon = res.url;
//       return Icon;
//     });
//     var card = document.createElement("div");
//     currentContainer.appendChild(card);
//     card.setAttribute("class", "currentWeatherCard");
//     var city = document.createElement("h2");
//     var date = document.createElement("h2");
//     var icon = document.createElement("img");
//     var temp = document.createElement("h2");
//     var wind = document.createElement("h2");
//     var humidity = document.createElement("h2");
//     var UV= document.createElement("h2");
// }