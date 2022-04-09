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
// var currentDate = moment.unix(cityInfo.date).format("MM/DD/YYYY");
var card1 = document.getElementById('card-body1')
var searchInput= document.getElementById('searchCityInput')
var searchButton= document.getElementById('search-btn')
var searchList= document.getElementById('searchHistory')
var card2= document.getElementById('card2')

//array to push searched cities into- I realized I name two values searchHistory and easily change this to search Mistory
let searchMistory = [];

//event listener function calling getCoordinates from the city
searchButton.addEventListener('click', function(event) {
    card1.innerHTML="";
    event.preventDefault()
    getCoordinates(searchInput.value)
    
    //Again, my button variable was renamed butto for button without the last letter. This stores the searched cities as a button
    var butto = document.createElement("button")
    butto.textContent= searchInput.value
    
    //adding search history buttons to list element
    searchList.append(butto)
    
    //event listener function to add searched cities to local storage
    butto.addEventListener('click', function (event) {
        card1.innerHTML="";
        event.preventDefault()
        getCoordinates(butto.textContent)
        displayCityName(butto.textContent)
    })
    searchMistory.push(searchInput.value)
        for (var i = 0; i < searchMistory.length; i++) {
            localStorage.setItem("cities",searchMistory)
        }
    })

    displayCityName(searchInput.value)

    for (var i = 0; i < searchMistory.length; i++) {
        localStorage.getItem("cities")
    }
    displayDate()
    
    function displayDate () {
        var showDate = document.createElement("h2")
        var currentDate = moment().format("MMMM Do YYYY");
        card1.appendChild(showDate)
        showDate.textContent= currentDate
    }

 //function retrieves the coordinates needed from the API url going through the promises to display the data throught the called function at the bottom
function forecast (lon, lat) {
    var getForecastUrl = 'https://api.openweathermap.org/data/2.5/onecall?'
    var getLat = "lat=" + lat
    var getLon = "&lon=" + lon
    var rest = "&units=imperial&appid="

    fetch(getForecastUrl + getLat + getLon + rest + apiKey)
    .then(function(response){
        response.json()
        .then(function(data) {
            
            displayForecastData(data)
        })
    })
}
//this function provides the coordinates for retrieving current day weather and a 5 day forecast and also has both functions called at the bottom to place the retrieved coordinates in
function getCoordinates (city) { 
    var apiCitySearch = 'https://api.openweathermap.org/geo/1.0/direct?q='
    var rest = "&limit=1&appid="
 
    fetch(apiCitySearch + city + rest + apiKey)
    .then(function(response){
        response.json()
        .then(function(data) {
            getWeather(data[0].lon,data[0].lat)
            forecast(data[0].lon,data[0].lat)
        })
    })
 }
 
 //this function uses the API url and concatenates the coordinates from the searched city through the promise functions
 function getWeather(lon, lat) {
     var getWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?'
     var getLat = "lat=" + lat
     var getLon = "&lon=" + lon
     var rest = "&units=imperial&limit=1&appid="
 
     fetch(getWeatherUrl + getLat + getLon + rest + apiKey)
    .then(function(response){
        response.json()
        .then(function(data) {
            console.log(data)
            displayCurrentData(data)
 
        })
    })
 }

 //function creates and attachess the city input from the user to display the current city weather conditions being searched
function displayCityName(name) {
    var searchedCity = document.createElement("h2")
    searchedCity.textContent = name
    card1.appendChild(searchedCity)
}

//this function hold the dynamic variables in the card1 div displaying the compnents and weather conditions fur current day of any city searched
function displayCurrentData (data) {
    console.log(data)
    var imageIcon= document.createElement("img")
    var getIcon= `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
    imageIcon.setAttribute("src",getIcon)
    card1.appendChild(imageIcon)
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
    var buttonDiv=document.createElement("div")
    var newButton= document.createElement("button")
    newButton.classList.add("btn")
    //added an if function to help show the color of the uv index- because there is not an orange color in bootstrap, hence making the extra class and styling it in css
    newButton.classList.add("col-2")
    if(data.current.uvi < 2) {
    newButton.classList.add("btn-success")
    }
    else if(data.current.uvi > 2 && data.current.uvi < 6 ) { 
    newButton.classList.add("btn-warning")
    }
    else if(data.current.uvi > 6 && data.current.uvi < 7 ) { 
        newButton.classList.add("btn")
        newButton.classList.add("orange")
        }
        else {newButton.classList.add("btn-danger")}
    newButton.textContent= data.current.uvi
    uvIndex.textContent="UV Index: "
    //moved the appended divs to display the button at the bottom of the container
    buttonDiv.classList.add("d-flex")
    buttonDiv.classList.add("justify-content-center")
    buttonDiv.appendChild(uvIndex)
    buttonDiv.appendChild(newButton)
    card1.appendChild(buttonDiv)
}