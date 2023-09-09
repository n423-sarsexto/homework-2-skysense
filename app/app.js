//navigation JS
/* Set the width of the sidebar to 250px */
function openNav() {
    $("#sidebarNav").css("width","250px");
}
function closeNav() {
    $("#sidebarNav").css("width","0");
}

//https://api.weatherapi.com/v1/forecast.json?key=4ccde8f188014b72810193654232808&q=46239&days=5&aqi=no&alerts=no
//set API call defaults
const baseURL = `https://api.weatherapi.com/v1/forecast.json?key=`;
const apiKey = `4ccde8f188014b72810193654232808`;
const apiVals = `&days=5&aqi=no&alerts=no`;

function getLocation(){
    $("#submit").on("click", (e)=>{
        e.preventDefault();
        let location = $("#location").val();

        if(location != ''){
            // let cityURL = baseURL + apiKey + "&q=" + city + "&days=2&aqi=no&alerts=no";
            let apiURL = `${baseURL}${apiKey}&q=${location}${apiVals}`
            $.getJSON(apiURL, (data)=>{
                console.log(data);
                setWeather(data);
            }).fail(function(e) {
                console.log( "error:", e );
                });
        }

    })  
}

function setWeather(weatherData){
    // current details
    $(".current").html(`<div class="split-1">
    <h2><span class="location-name">Currently in ${weatherData.location.name}</span></h2>
    <div class="present-details">
        <div class="current-weather-img"><img src="${weatherData.current.condition.icon}" alt="${weatherData.current.condition.text}"></div>
        <h3><span class="degrees-f">${weatherData.current.temp_f}</span><sup>°F</sup> &nbsp; | &nbsp; <span
                class="degrees-c">${weatherData.current.temp_c}</span><sup>°C</sup></h3>
        <p class="feels-like">Feels like:</br>
            <span class="degrees-f">${weatherData.current.feelslike_f}</span><sup>°F</sup> &nbsp; | &nbsp; <span
                class="degrees-c">${weatherData.current.feelslike_c}</span><sup>°C</sup>
        </p>
    </div>
    <div class="addtl-present">
        <p class="rain">Precipitation: ${weatherData.current.precip_in}%</p>
        <p class="humidity">Humidity: ${weatherData.current.humidity}%</p>
        <p class="wind">Wind: ${weatherData.current.wind_mph}mph ${weatherData.current.wind_dir}</p>
    </div>
</div>
<div class="split-2">
    <p class="last-updated">Last updated ${weatherData.current.last_updated} ${weatherData.location.tz_id} time</p>
    <p>Enter a location to get the weather data.</p>
</div>`);

    // future details
    //first, reset old future forecast
    $(".future").html("");
    //then, get new future forecast data
    for(let i = 1; i < weatherData.forecast.forecastday.length; i++){
        //for each, append the elements inside of a new "day" element
        $(".future").append(`<div class="day">
            <div class="date">${weatherData.forecast.forecastday[i].date}</div>
        </div>`);
    }
}

function initListeners(){
    getLocation();
}

$(document).ready(function(){
    initListeners(); 
});