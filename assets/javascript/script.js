var weatherContainer = document.getElementById('weather');
var historyContainer = document.getElementById('history');
var searchButton = document.getElementById('search-button');


// set up the API key
var APIkey = '306168e2a8d2686de286ec2757ccac79';




// function to get Weather API Data
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
      temp.classList = "list-group";

      var cityNameEL = document.createElement('h3');
      cityNameEL.textContent = data.name;

      var humidity = document.createElement('span');
      humidity.textContent = "Humidity: " + data.main.humidity;
      humidity.classList = "list-group";

      var windSpeed = document.createElement('span');
      windSpeed.textContent = "Wind Speed: " + data.wind.speed + " mph";
      windSpeed.classList = "list-group";

      weatherContainer.append(cityNameEL, temp, humidity, windSpeed);


      var searchNameEl = document.createElement('h2')
      searchNameEl.textContent = data.name;
      historyContainer.append(searchNameEl);
      localStorage.setItem('cityHistory', data.name);

      console.log(localStorage);

      var lon = data.coord.lon;
      var lat = data.coord.lat;
      getUVIndex(lat, lon);

      
      var weatherIcon = document.createElement("img")
      weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      cityNameEL.appendChild(weatherIcon);



    });
}

function getUVIndex(lat, lon) {
  var queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIkey}&lat=${lat}&lon=${lon}`;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var UVIndex = document.createElement('span');
      UVIndex.textContent = "UV Index: " + data.value;
      console.log(data.value);
      UVIndex.classList = "list-group"


    });
}

// // function getFiveDay(searchValue) {
// //   var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${APIkey}`;
// //   fetch(queryURL)
// //   .then(function (response) {
// //     return response.json();
    
// //   })
// //   .then(function (data) {
// //     console.log(data);
// //     var fiveDay = document.createElement('span');
// //     fiveDay.textContent = "Five Day: " + data.value;
// //     console.log(data);
// //     fiveDay.classList = "list-group"

// //     fiveDayContainer.append(fiveDay);
// //   })
// }


searchButton.addEventListener('click', getApi);