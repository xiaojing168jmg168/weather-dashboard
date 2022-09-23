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
var weatherContainer = document.querySelector(".weather-container");
// var countryCode = "US";
var forecastEls = document.querySelectorAll(".forecast");

var cityName = localStorage.getItem("city");
 var clearEl = document.querySelector(".clear-history");

  var searchHistoryList = JSON.parse(localStorage.getItem("city")) || [];


//clicking search button will trigger sarchApi and display searched cities
   
function handleSubmit(event){
    event.preventDefault();

    var city = searchCity.value.trim();

   searchCity.innerHTML="";

    getWeather(city);

    displayCities();
      
}
searchForm.addEventListener("submit", handleSubmit);

//get user search save to local and inset to ul 

function displayCities(){
var city = searchCity.value.trim();
if(searchHistoryList.includes(city) || city === ""){
renderCities();
return;
}else{
 searchHistoryList.push(city);
  localStorage.setItem("city", JSON.stringify(searchHistoryList));
    console.log(searchHistoryList); 
renderCities();
}
}


function renderCities(){
cityItemEl.innerHTML="";
for(let i=0; i<searchHistoryList.length; i++){
var searchedCity = document.createElement("input");
    searchedCity.setAttribute("type","text");
    searchedCity.setAttribute("readonly",true);
    searchedCity.setAttribute("class", "d-block bg-white city-li form-control");
   
    searchedCity.setAttribute("value", searchHistoryList[i]);
    searchedCity.addEventListener("click",function() {
                getWeather(searchHistoryList[i]);
            })

    cityItemEl.appendChild(searchedCity);
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
        weatherContainer.innerHTML="";
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
    
    //displya current date weather

     nameEl.innerHTML= data.name + " (" + currentDay + ")";

     let weatherIcon = data.weather[0].icon;
     currentPic.setAttribute("src","https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png")
     currentPic.setAttribute("alt", data.weather[0].description);
     
     currentTempEl.innerHTML = "Temperature: " + kToF(data.main.temp) + "°F";
     currentHumEl.innerHTML = "Humidity: " + data.main.humidity + "%";
     currentWindEl.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";
let cityId = data.id;
return fetch("https://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&appid=" + APIKey); 
    })

  .then(function(response){
    return response.json();
    })
    .then(function(data){
   

//display the forecast
  for(let i=0; i<forecastEls.length; i++){

    forecastEls[i].innerHTML="";
    const forecastIndex = i * 8 + 4;
   
    var cityInfo = {
      icon: data.list[forecastIndex].weather[0].icon,
      temp: data.list[forecastIndex].main.temp,
      humidity: data.list[forecastIndex].main.humidity,
      wind: data.list[forecastIndex].wind.speed
      };
    
    //  display the date, icon, weather conditions

    const forecastDate = new Date(data.list[forecastIndex].dt * 1000);
    const forecastDay = forecastDate.getDate();
    const forecastMonth = forecastDate.getMonth() + 1;
    const forecastYear = forecastDate.getFullYear();
    const forecastDateEl = document.createElement('p');
    forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
    forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;

    forecastEls[i].appendChild(forecastDateEl);

    const forecastIcon = document.createElement('img');
    forecastIcon.setAttribute("src","https://openweathermap.org/img/wn/" + cityInfo.icon + "@2x.png");
    forecastIcon.setAttribute("alt",data.list[forecastIndex].weather[0].main);
    forecastEls[i].appendChild(forecastIcon);
      
    const forecastTempEl = document.createElement('p');
    forecastTempEl.innerHTML = "Temp: " + kToF(cityInfo.temp) + "°F";
    forecastEls[i].appendChild(forecastTempEl);

    const forecastHumidityEl = document.createElement('p');
    forecastHumidityEl.innerHTML = "Humidity: " + cityInfo.humidity + "%";
    forecastEls[i].appendChild(forecastHumidityEl);

    const forecastWindEl = document.createElement('p');
    forecastWindEl.innerHTML = "Wind Speed: " + cityInfo.wind + "MPH";
    forecastEls[i].appendChild(forecastWindEl);

        }

        })
    }

//when open the app display last searched city forecast
$(document).ready(function() {
    var searchHistoryArr = JSON.parse(localStorage.getItem("city"));

    if (searchHistoryArr !== null) {
        var lastSearchedIndex = searchHistoryArr.length - 1;
        var lastSearchedCity = searchHistoryArr[lastSearchedIndex];

        getWeather(lastSearchedCity);
        displayCities();
        console.log(`Last searched city: ${lastSearchedCity}`);
    }
});
      




