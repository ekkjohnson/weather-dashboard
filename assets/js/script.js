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
var currentWeatherEL = document.getElementById("current-container")
var forecast = document.getElementById("forecast-container")
var history = document.getElementById("history");
var weather = 'https://api.openweathermap.org/data/2.5/onecall?'

var rest = "&units=imperial&limit=1&appid="
var displayWeather=function(weather, citySearch){
    currentWeather.textContent="";
    cityInput.textContent=citySearch;
    console.log(weather);

}

// display weather 
function getCityCoordinates (city) { 
    var cityCoordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIkey}`
    
 
    fetch(cityCoordinates)
    .then(function(response){
        return response.json();
        })
        
        .then(function(data) {
            console.log(data)
            getWeather(data[0].lon,data[0].lat)
            // getForecast(data[0].lon,data[0].lat)
    })
 
 }

//call

searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    var city= cityInput.value.trim()
    console.log(city)
    getCityCoordinates(city)
    cityInput.value=""
})


 function getWeather(lon, lat) {
    var requestURL= `${weather}lat=${lat}&lon=${lon}&appid=${APIkey}`;

     fetch(requestURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data.current)
        let currentWeather = {
            temp: data.current.temp,
            humidity:  data.current.humidity, 
            wind: data.current.wind,
            uvi: data.current.uvi
        }
        console.log( currentWeather)
      
        currentForecast(currentWeather)
        // weatherData={data}
    })
 }


// var currentDay=document.createElement("span")
// currentDay.textContent="("+ moment(currentWeather.dt.value).format ("MMM D, YYYY") + ") ";
// citySearch.appendChild(currentDay);

function currentForecast(current) {

    // removeAllChildNodes(currentWeather);
    // removeAllChildNodes(forecast)
    // var iconUrl = `http://openweathermap.org/img/wn/${forecast[0].weather[0].icon}@2x.png`;
    // var Icon;
    // fetch(iconUrl).then(function (res) {
    //   Icon = res.url;
    //   return Icon;
    // });
    // var card = document.createElement("div");
    // currentContainer.appendChild(card);
    // card.setAttribute("class", "currentWeatherCard");
    // var cityEl = document.createElement("h2");

    // var date = document.createElement("h2");
    // var icon = document.createElement("img");
    var tempEl = document.createElement("h2");
    tempEl.textContent = current.temp; 
    currentWeatherEL.appendChild(tempEl)
    // var wind = document.createElement("h2");
    // var humidity = document.createElement("h2");
    // var UV= document.createElement("h2");
}
card.appendChild(date);
  date.textContent = currentDay;
  card.appendChild(iconImg);
  iconImg.setAttribute("src", iconUrl);
  card.appendChild(temp);
  temp.textContent = `Temperature: ${forecast[0].temp.day}°F`;
  card.appendChild(wind);
  wind.textContent = `Wind: ${forecast[0].wind_speed} MPH`;
  card.appendChild(humidity);
  humidity.textContent = `Humidity: ${forecast[0].humidity}`;
  card.appendChild(uvIndex);
  uvIndex.textContent = `UV Index: ${forecast[0].uvi}`;
  if (forecast[0].uvi <= 2) {
    uvIndex.setAttribute("class", "low");
  } else if (forecast[0].uvi <= 5) {
    uvIndex.setAttribute("class", "moderate");
  } else if (forecast[0].uvi <= 7) {
    uvIndex.setAttribute("class", "high");
  } else if (forecast[0].uvi <= 10) {
    uvIndex.setAttribute("class", "very-high");
  } else if (forecast[0].uvi > 11) {
    uvIndex.setAttribute("class", "extreme");
  }