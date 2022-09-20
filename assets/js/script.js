var searchCity = document.querySelector('#search-city');
var searchForm = document.querySelector('#user-form');
var searchCityButton = document.querySelector('.search-btn');
var APIKey = "adf46be5146fd6c70576939f90013837";




//clicking search button will trigger sarchApi 
function handleSubmit(event){
    event.preventDefault();
    var searchValue = searchCity.val().trim();
    console.log(searchValue);
    if(!searchValue){
    console.error('You need a search input value!');
    return;
    }
    searchApi(searchValue);
    searchCity.val('');
}


searchCityButton.addEventListener('submit', handleSubmit);
// Request Open Weather API based on user input
function searchApi(searchValue){
 fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchValue+ '&appid=' + APIKey +'&cnt=5') 

  .then(function(response){
    return response.json();
    })
    .then(function(data){
    console.log('--->'+(JSON.stringify(data)));
    
    })

}
