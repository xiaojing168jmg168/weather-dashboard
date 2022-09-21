var searchCity = document.querySelector('#search-city');
var searchForm = document.querySelector('#user-form');
var searchCityButton = document.querySelector('.search-btn');
var APIKey = "adf46be5146fd6c70576939f90013837";
var cityItemEl = document.querySelector('#city-list');

var cityName = localStorage.getItem("city");
 var clearEl = document.querySelector('.clear-history');

  var searchHistoryList = JSON.parse(localStorage.getItem("city")) || [];

var URLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + '&units=imperial' +APIKey;
//clicking search button will trigger sarchApi 
   
function handleSubmit(event){
    event.preventDefault();

     var city = searchCity.value.trim();
  
    getWeather(city);
    searchCity.value="";
    
    displayCities(city);
}
searchForm.addEventListener('submit', handleSubmit);

//get user search save to local and inset to ul 

function displayCities(){
var city = searchCity.value.trim();
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
}

 displayCities();
if(searchHistoryList.length>0){
getWeather(searchHistoryList[searchHistoryList.length - 1]);
}


  // Clear History button
    clearEl.addEventListener("click", function () {
        localStorage.clear();
        searchHistoryList = [];
        displayCities();
    })



// Request Open Weather API based on user input
function getWeather(searchValue){
 fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchValue+ '&appid=' + APIKey +'&cnt=5') 

  .then(function(response){
    return response.json();
    })
    .then(function(data){
    console.log(JSON.stringify(data));
    
    })

}
console.log(getWeather("cleveland"));
