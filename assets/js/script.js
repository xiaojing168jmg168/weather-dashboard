var searchCity = document.querySelector("#search-city");
var searchForm = document.querySelector("#user-form");
var searchCityButton = document.querySelector(".search-btn");
var APIKey = "adf46be5146fd6c70576939f90013837";
var cityItemEl = document.querySelector("#city-list");
var nameEl = document.querySelector(".city-name");
var currentPic = document.querySelector("#current-pic");
var currentTempEl = document.querySelector("#temperature");
var currentHumEl = document.querySelector("#humidity");
var currentWindEl = document.querySelector("#wind-speed");

var cityName = localStorage.getItem("city");
 var clearEl = document.querySelector(".clear-history");

  var searchHistoryList = JSON.parse(localStorage.getItem("city")) || [];

var URLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial" +APIKey;
//clicking search button will trigger sarchApi 
   
function handleSubmit(event){
    event.preventDefault();

     var city = searchCity.value.trim();
  
    getWeather(city);
    searchCity.innerHTML="";
    
    displayCities();
}
searchForm.addEventListener("submit", handleSubmit);

//get user search save to local and inset to ul 

function displayCities(){
var city = searchCity.value.trim();
if(searchHistoryList.includes(city)){
return;
}else{
 searchHistoryList.push(city);
  localStorage.setItem("city", JSON.stringify(searchHistoryList));
    console.log(searchHistoryList); 
   
cityItemEl.innerHTML="";
for(let i=0; i<searchHistoryList.length; i++){
var searchedCity = document.createElement("input");
    searchedCity.setAttribute("type","text");
    searchedCity.setAttribute("readonly",true);
    searchedCity.setAttribute("class", "d-block bg-white city-li form-control");
   
    searchedCity.setAttribute("value", searchHistoryList[i]);
    searchedCity.addEventListener("click",function() {
                getWeather(searchedCity.value);
            })

    cityItemEl.appendChild(searchedCity);
  }
if(searchHistoryList.length>0){
getWeather(searchHistoryList[searchHistoryList.length - 1]);
}
}
}


//temp from Default: Kelvin to Fahrenheit.
  function kToF(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    }

  // Clear History button
    clearEl.addEventListener("click", function () {
        localStorage.clear();
        searchHistoryList = [];
        document.location.reload();
    })



// Request Open Weather API based on user input
function getWeather(searchValue){
 fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchValue+ "&appid=" + APIKey + "&cnt=5") 

  .then(function(response){
    return response.json();
    })
    .then(function(data){
    console.log(JSON.stringify(data));

    var currentDay = moment().format('L');
    console.log(currentDay);
    //  var data = JSON.stringify(data);

     nameEl.innerHTML= data.name + " (" + currentDay + ")";

     let weatherIcon = data.weather[0].icon;
     currentPic.setAttribute("src","https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png")
     currentPic.setAttribute("alt", data.weather[0].description);
     
     currentTempEl.innerHTML = "Temperature: " + kToF(data.main.temp) + "°F";
     currentHumEl.innerHTML = "Humidity: " + data.main.humidity + "%";
     currentWindEl.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";




    
    })

}
console.log(getWeather("cleveland"));


// {"coord":{"lon":-81.6954,"lat":41.4995},
// "weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],
// "base":"stations",
// "main":{"temp":302.78,"feels_like":305.66,"temp_min":300.38,"temp_max":304.6,"pressure":1009,"humidity":62},"visibility":10000,
// "wind":{"speed":8.75,"deg":230,"gust":10.8},
// "clouds":{"all":75},
// "dt":1663784253,
// "sys":{"type":1,"id":3455,"country":"US","sunrise":1663758791,"sunset":1663802795},
// "timezone":-14400,
// "id":5150529,
// "name":"Cleveland",
// "cod":200}