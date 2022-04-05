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
var day = moment().format('L');
var historySearch= [];

// function for current weather in input field city
function currentWeather(city) {

    var URL  = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
//calls api
    $.ajax({
        url: URL,
        method: "GET"
    }).then(function(cityWeather) {
        console.log(cityWeather);
        
        $("#weatherContent").css("display", "block");
        $("#cityInfo").empty();
        //gets icons
        var iconCode = cityWeather.weather[0].icon;
        var iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

        
    })
}