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