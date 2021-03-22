
var weatherContainer = document.getElementById('weather');
var historyContainer = document.getElementById('history');
var searchButton = document.getElementById('search-button');


// set up the API key
var APIkey = '306168e2a8d2686de286ec2757ccac79';

// add function for local storage cityHistory
 


function getApi() {
    var searchValue = document.getElementById('search-value').value;
   
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${APIkey}&units=imperial`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
        var temp = document.createElement('span');
        temp.textContent = "Temperature: " + data.main.temp + " F";
        temp.classList = "list-group-item";

        var cityNameEL= document.createElement('h3');
        cityNameEL.textContent = data.name;

        var humidity = document.createElement('span');
        humidity.textContent = "Humidity: " + data.main.humidity;
        humidity.classList = "list-group-item";

        var windSpeed = document.createElement('span');
        windSpeed.textContent = "Wind Speed: " + data.wind.speed + " mph";
        windSpeed.classList = "list-group-item";

        weatherContainer.append(cityNameEL, temp, humidity, windSpeed);

        localStorage.setItem('cityHistory', data.name);

        
    });
}
searchButton.addEventListener('click', getApi);