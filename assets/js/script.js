var searchCity = document.querySelector('#search-city');
var searchForm = document.querySelector('#user-form');
var searchCityButton = document.querySelector('.search-btn');
var APIKey = "adf46be5146fd6c70576939f90013837";
var cityItemEl = document.querySelector('#city-list');

var cityName = localStorage.getItem('cities');
 var clearEl = document.querySelector('.clear-history');

  let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

var URLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + '&units=imperial' +APIKey;
//clicking search button will trigger sarchApi 
   
function handleSubmit(event){
    event.preventDefault();

     var searchValue = searchCity.value.trim();
    if(!searchValue){
    console.error('You need a search input value!');
    return;
    }
    getWeather(searchValue);
    searchCity.value="";
    searchHistory.push(searchValue);
    saveCityDataToLocal(searchValue);
    displayCities(searchValue);
}
searchForm.addEventListener('submit', handleSubmit);

// Function to save the city to localStorage
// Sets the input value in localStorage
function saveCityDataToLocal(newCity) {
    searchValue = searchCity.value.trim()
    localStorage.setItem('cityNameStore', searchValue);
  let cityExists = false;
    // Check if City exists in local storage
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage["cities" + i] === newCity) {
            cityExists = true;
            break;
        }
    }
    // Save to localStorage if city is new
    if (cityExists === false) {
        localStorage.setItem('cities' + localStorage.length, newCity);
    }
}




//get user search and inset to ul

function displayCities(){
if(localStorage.length===0){
return;

}else{
// Append the search input from localStorage to the cities list
console.log(localStorage);
for(let i=0;i<localStorage.length;i++){
 let city = localStorage.getItem("cities" + i);
var cityList = document.createElement("input");
    cityList.setAttribute("type","text");
    cityList.setAttribute("readonly",true);
    cityList.setAttribute("class", "d-block bg-white city-li form-control");
    cityList.setAttribute("style", "width: 100%");
    cityList.setAttribute("value", city);
    cityList.addEventListener("click",function() {
                getWeather(cityList.value);
            })
    cityItemEl.appendChild(cityList);

}

}

}

  // Clear History button
    clearEl.addEventListener("click", function () {
        localStorage.clear();
        searchHistory = [];
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
