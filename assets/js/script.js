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
        console.log( currentWeather);
    localStorage.setItem("city input",currentWeather);
    localStorage.getItem(currentWeather)
            currentForecast();
          });
          function displayCurrentData (data) {
            var currentTemp= document.createElement("h3")
            currentTemp.textContent= "Temp: " + data.current.temp
            card1.appendChild(currentTemp)
            var currentWind= document.createElement("h3")
            currentWind.textContent= "Wind Speed: " + data.current.wind_speed
            card1.appendChild(currentWind)
            var currentHumidity= document.createElement("h3")
            currentHumidity.textContent= "Humidity: " + data.current.humidity
            card1.appendChild(currentHumidity)
            var uvIndex= document.createElement("h3")
            uvIndex.textContent="UV Index: " + data.current.uvi
            card1.appendChild(uvIndex)
        
            
        }
        
        function displayForecastData (data) {
            console.log(data.daily)
            card2.innerHTML="";
            for (var i = 1; i < 6; i++) {
                var container= document.createElement("div")
                container.classList.add("card-body2")
                container.classList.add("col-2")
                container.setAttribute("id","forecastBody2")
                var temp= document.createElement("h5")
                temp.textContent="Temp: " + data.daily[i].temp.day
                container.appendChild(temp)
                card2.appendChild(container)
                var wind= document.createElement("h5")
                wind.textContent="Wind Speed: " + data.daily[i].wind_speed
                container.appendChild(wind)
                card2.appendChild(container)
                var humidity= document.createElement("h5")
                humidity.textContent="Humidity: " + data.daily[i].humidity
                container.appendChild(humidity)
                card2.appendChild(container)
                
            }
        }
    }