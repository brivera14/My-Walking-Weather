/*-------------------------------------------------------------------------Declare Global Varibales---------------------------------------------------------------------------------*/
var cityFormEl = document.querySelector("#city-form");
var inputEl = document.querySelector("#input");
var weatherContainerEl = document.querySelector("#Weather-info");
var searchHistoryContainerEl = document.querySelector("#search-history");
var forcastContEl = document.querySelector("#forecast-container");
var forecastUno = document.querySelector("#forecast1");
var forecastDos = document.querySelector("#forecast2");
var forecastTres = document.querySelector("#forecast3");
var forecastCuatro = document.querySelector("#forecast4");
var forecastCinco = document.querySelector("#forecast5");
/*--------------------------------------------------------------------------Fetch API----------------------------------------------------------------------------------------------*/
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

    // get 5 Day Forecast Weather
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + name + "&units=imperial&APPID=0c8732c75eaaeabff3d4d751690ee9d5";
    fetch (apiUrl).then(function(response2) {
        // request was successful
        if (response2.ok) {
            response2.json().then(function (data) {
                displayForecastWeather(data);
            });
        } else {
            alert("Error: " + response2.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Github");
    });  
};

/*--------------------------------------------------------------------------Current Weather ---------------------------------------------------------------------------------------*/
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

    // Get UV Index
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var apiUviUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=0c8732c75eaaeabff3d4d751690ee9d5&lat=" + lat + "&lon=" + lon;
    fetch(apiUviUrl).then(function(uvi){
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

    //    // Get weather condition Icon
    //    var icon = response.weather[0].icon;
    //    var apiIconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    //    fetch(apiIconUrl).then(function(response){
    //        response.then(function(dataIcon){
    //           var iconEl = document.createElement("span");
    //           iconEl.textContent = dataIcon;
    //           titleEl.appendChild(iconEl);
    //        });
    //    });
};
/*--------------------------------------------------------------------------5-Day Forecast------------------------------------------------------------------------------------------*/
var displayForecastWeather = function (response2) {
    var fiveDayEl = document.querySelector("#fiveDay");
    fiveDayEl.style.display = "block";
/*--------------------------------------------------------------------------1st card------------------------------------------------------------------------------------------------*/
    // clear old content
    forecastUno.textContent = "";
    
    // Display the information selecter from the API Response
    var titleEl = document.createElement("div");
    var dateEl = document.createElement("h3");
    dateEl.textContent = response2.list[6].dt_txt;
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temperature: " + response2.list[6].main.temp + "°F";
    var humEl = document.createElement("p");
    humEl.textContent = "Humidity: " + response2.list[6].main.humidity + "%";
    
    titleEl.appendChild(dateEl);
    titleEl.appendChild(tempEl);
    titleEl.appendChild(humEl);
    
    forecastUno.appendChild(titleEl);
/*--------------------------------------------------------------------------2nd card------------------------------------------------------------------------------------------------*/
    // clear old content
    forecastDos.textContent = "";
    
    // Display the information selecter from the API Response
    var titleEl = document.createElement("div");
    var dateEl = document.createElement("h3");
    dateEl.textContent = response2.list[14].dt_txt;
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temperature: " + response2.list[14].main.temp + "°F";
    var humEl = document.createElement("p");
    humEl.textContent = "Humidity: " + response2.list[14].main.humidity + "%";
    
    titleEl.appendChild(dateEl);
    titleEl.appendChild(tempEl);
    titleEl.appendChild(humEl);
    
    forecastDos.appendChild(titleEl);
/*--------------------------------------------------------------------------3rd card------------------------------------------------------------------------------------------------*/
    // clear old content
    forecastTres.textContent = "";
    
    // Display the information selecter from the API Response
    var titleEl = document.createElement("div");
    var dateEl = document.createElement("h3");
    dateEl.textContent = response2.list[22].dt_txt;
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temperature: " + response2.list[22].main.temp + "°F";
    var humEl = document.createElement("p");
    humEl.textContent = "Humidity: " + response2.list[22].main.humidity + "%";
    
    titleEl.appendChild(dateEl);
    titleEl.appendChild(tempEl);
    titleEl.appendChild(humEl);
    
    forecastTres.appendChild(titleEl);
/*--------------------------------------------------------------------------4th card------------------------------------------------------------------------------------------------*/
    // clear old content
    forecastCuatro.textContent = "";
    
    // Display the information selecter from the API Response
    var titleEl = document.createElement("div");
    var dateEl = document.createElement("h3");
    dateEl.textContent = response2.list[30].dt_txt;
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temperature: " + response2.list[30].main.temp + "°F";
    var humEl = document.createElement("p");
    humEl.textContent = "Humidity: " + response2.list[30].main.humidity + "%";
    
    titleEl.appendChild(dateEl);
    titleEl.appendChild(tempEl);
    titleEl.appendChild(humEl);
    
    forecastCuatro.appendChild(titleEl);
/*--------------------------------------------------------------------------5th card------------------------------------------------------------------------------------------------*/
    // clear old content
    forecastCinco.textContent = "";
    
    // Display the information selecter from the API Response
    var titleEl = document.createElement("div");
    var dateEl = document.createElement("h3");
    dateEl.textContent = response2.list[38].dt_txt;
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temperature: " + response2.list[38].main.temp + "°F";
    var humEl = document.createElement("p");
    humEl.textContent = "Humidity: " + response2.list[38].main.humidity + "%";
    
    titleEl.appendChild(dateEl);
    titleEl.appendChild(tempEl);
    titleEl.appendChild(humEl);
    
    forecastCinco.appendChild(titleEl);
};

/*--------------------------------------------------------------------------City Input and Store-----------------------------------------------------------------------------------*/

var cityFormHandler = function (event) {
    event.preventDefault();
    var cityName = inputEl.value.trim();
    if (cityName) {
        getWeather(cityName);
        var searchList = [];
        searchList.push(cityName);
        localStorage.setItem("City", JSON.stringify(searchList));
        inputEl.value = "";
    } else {
        alert("Please enter a City Name");
    }
    displaySearchHistory();
};

/*--------------------------------------------------------------------------Display Search History---------------------------------------------------------------------------------*/

function displaySearchHistory () {
    var savedCity = JSON.parse(localStorage.getItem("City"));
    var cityList = document.createElement("div");
    var cityBtn = document.createElement("button");
    cityBtn.textContent = savedCity
    cityList.appendChild(cityBtn);
    searchHistoryContainerEl.appendChild(cityList);
    //cityFormEl.prepend(cityList);
}

/*--------------------------------------------------------------------------Event Listener------------------------------------------------------------------------------------------*/
cityFormEl.addEventListener("submit", cityFormHandler);