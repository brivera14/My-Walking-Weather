var cityFormEl = document.querySelector("#city-form");
var inputEl = document.querySelector("#input");
var weatherContainerEl = document.querySelector("#Weather-info");

// get Current Weather
var getWeather = function (name) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=imperial&APPID=0c8732c75eaaeabff3d4d751690ee9d5";
    fetch (apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                displayCurrentWeather(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Github");
    });  
};

var cityFormHandler = function (event) {
    event.preventDefault();
    var cityName = inputEl.value.trim();
    if (cityName) {
        getWeather(cityName);
        inputEl.value = "";
    } else {
        alert("Please enter a City Name");
    }
};

var displayCurrentWeather = function (response) {

    // clear old content
    weatherContainerEl.textContent = "";
    
    // Display the information selecter from the API Response
    var titleEl = document.createElement("div");
    var cityEl = document.createElement("h3");
    cityEl.textContent = response.name;
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temperature: " + response.main.temp + "°F";
    var humEl = document.createElement("p");
    humEl.textContent = "Humidity: " + response.main.humidity + "%";
    var windSpeedEl = document.createElement("p");
    windSpeedEl.textContent = "Wind Speed: " + response.wind.speed + " MPH";
    
    titleEl.appendChild(cityEl);
    titleEl.appendChild(tempEl);
    titleEl.appendChild(humEl);
    titleEl.appendChild(windSpeedEl);
    
    weatherContainerEl.appendChild(titleEl);

    var lat = response.coord.lat;
    var lon = response.coord.lon;
    
    // Get UV Index
    var apiUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=0c8732c75eaaeabff3d4d751690ee9d5&lat=" + lat + "&lon=" + lon;
    fetch(apiUrl).then(function(uvi){
        uvi.json().then(function(datauvi){
            var uvIndexEl = document.createElement("p");
            uvIndexEl.textContent = "UV Index: " + datauvi.value;
            titleEl.appendChild(uvIndexEl);

            if (datauvi.value < 3) { 
                uvIndexEl.style.backgroundColor = 'green';
              } else if (datauvi.value < 6) { 
                uvIndexEl.style.backgroundColor = 'yellow';
              } else if (datauvi.value < 8) { 
                uvIndexEl.style.backgroundColor = 'orange';
              } else if (datauvi.value < 11) { 
                uvIndexEl.style.backgroundColor = 'red';
              } else {
                uvIndexEl.style.backgroundColor = 'purple';
                uvIndexEl.style.color = 'white';
              }
        });
    });
};


cityFormEl.addEventListener("submit", cityFormHandler);