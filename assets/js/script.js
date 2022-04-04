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
var currentDay = moment().format("dddd, MMMM Do YYYY");
var cityInput = document.getElementById("cityInput");
var searchBtn = document.getElementById("searchBtn");
var currentWeatherEL = document.getElementById("current-container")
var forecast = document.getElementById("forecast-container")
var history = document.getElementById("history");
var weather = 'https://api.openweathermap.org/data/2.5/onecall?'

var rest = "&units=imperial&limit=1&appid="
var displayWeather=function(weather, citySearch){
    currentWeatherEL.textContent="";
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
        res.json().then(function (data) {
            for (let i = 0; i < 6; i++) {
              forecast.push(data.daily[i]);
            }
            currentForecast();
          });
        })
       

// var currentDay=document.createElement("span")
// currentDay.textContent="("+ moment(currentWeather.dt.value).format ("MMM D, YYYY") + ") ";
// citySearch.appendChild(currentDay);

function currentForecast(current) {

    // removeAllChildNodes(currentWeather);
    // removeAllChildNodes(forecast)
    var iconCode = cityWeatherResponse.weather[0].icon;
    var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;
    fetch(iconURL).then(function (res) {
      icon = res.url;
      return icon;
    });
    ;
    var cityEl = document.createElement("h2");
    cityEl.textContent = current.city; 
    currentWeatherEL.appendChild(cityEl)
    var date = document.createElement("h2");
    var date = currentDay; 
    currentWeatherEL.appendChild(date)
    var icon = document.createElement("img");
   icon.textContent = current.icon; 
    currentWeatherEL.appendChild(icon)
    var tempEl = document.createElement("h2");
    tempEl.textContent = current.temp; 
    currentWeatherEL.appendChild(tempEl)
    var windEl = document.createElement("h2");
    windEl.textContent = current.wind; 
    currentWeatherEL.appendChild(windEl)
    var humidityEl = document.createElement("h2");
    humidityEl.textContent = current.humidity; 
    currentWeatherEL.appendChild(humidityEl)
    var uviEl = document.createElement("h2");
    uviEl.textContent = current.uvi; 
    currentWeatherEL.appendChild(uviEl)
    
}
var card = document.createElement("div");
    currentContainer.appendChild(card);
    card.setAttribute("class", "currentWeatherCard")
card.appendChild(date);
  date.textContent = currentDay;
  card.appendChild(iconImg);
  iconImg.setAttribute("src", iconUrl);
  card.appendChild(temp);
  temp.textContent = `Temperature: ${currentWeatherEL[0].temp.day}°F`;
  card.appendChild(wind);
  wind.textContent = `Wind: ${currentWeatherEL[0].wind_speed} MPH`;
  card.appendChild(humidity);
  humidity.textContent = `Humidity: ${currentWeatherEL[0].humidity}`;
  card.appendChild(uvIndex);
  uvIndex.textContent = `UV Index: ${currentWeatherEL[0].uvi}`;
  if (currentWeatherEL[0].uvi <= 2) {
    uvIndex.setAttribute("class", "low");
  } else if (currentWeatherEL[0].uvi <= 5) {
    uvIndex.setAttribute("class", "moderate");
  } else if (currentWeatherEL[0].uvi <= 7) {
    uvIndex.setAttribute("class", "high");
  } else if (currentWeatherEL[0].uvi <= 10) {
    uvIndex.setAttribute("class", "very-high");
  } else if (currentWeatherEL[0].uvi > 11) {
    uvIndex.setAttribute("class", "extreme");
  }}