var weatherContainer = document.getElementById('weather');
var historyContainer = document.getElementById('history');
var searchButton = document.getElementById('search-button');
var fiveDayContainer = document.getElementById('five-day-container');


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
      $('#search-value').val('');

      var temp = document.createElement('span');
      temp.textContent = "Temperature: " + data.main.temp + " F";
      temp.classList = "list-group";

      var cityNameEL = document.createElement('h3');
      cityNameEL.textContent = data.name;

      var humidity = document.createElement('span');
      humidity.textContent = "Humidity: " + data.main.humidity + ' %';
      humidity.classList = "list-group";

      var windSpeed = document.createElement('span');
      windSpeed.textContent = "Wind Speed: " + data.wind.speed + " mph";
      windSpeed.classList = "list-group";

      weatherContainer.innerHTML = '';
      weatherContainer.append(cityNameEL, temp, humidity, windSpeed);


      var searchNameEl = document.createElement('h2')
      searchNameEl.textContent = data.name;
      historyContainer.append(searchNameEl);
      localStorage.setItem('cityHistory', data.name);

      console.log(localStorage);

      var lon = data.coord.lon;
      var lat = data.coord.lat;

      getUVIndex(lat, lon);


      var currentDate = document.createElement("span")
      currentDate.textContent = " (" + moment(weather.dt).format("MMM D, YYYY") + ") ";
      cityNameEL.append(currentDate);


      var weatherIcon = document.createElement("img")
      weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      cityNameEL.appendChild(weatherIcon);


      // getFiveDay(searchValue);

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

      weatherContainer.appendChild(UVIndex);


    });
}


function getFiveDay() {
  var searchValue = document.getElementById('search-value').value;
  var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=imperial&appid=${APIkey}`;

  fetch(fiveDayUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var temp = document.createElement('span');
      temp.textContent = "Temperature: " + data.list[0].main.temp + ' F';
      temp.classList = "list-group";

      // var weatherIcon = document.createElement("img")
      // weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[0].weather.icon}@2x.png`);
      // citNameEL.append(weatherIcon);

      

      var currentDate = document.createElement("span")
      currentDate.textContent = " (" + moment(weather.dt).format("MMM D, YYYY") + ") ";
      

      var humidity = document.createElement('span');
      humidity.textContent = "Humidity: " + data.list[0].main.humidity + ' %';
      humidity.classList = "list-group";

      fiveDayContainer.innerHTML = "";
      fiveDayContainer.append(currentDate, temp, humidity);


     
      
    })


     
}


searchButton.addEventListener('click', getApi);
searchButton.addEventListener('click', getFiveDay);

window.addEventListener("load", function () {
  window.localStorage.getItem("cityHistory");
})