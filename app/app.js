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
    $(".current-weather-img").html(`<img src="${weatherData.current.condition.icon}" alt="${weatherData.current.condition.text}">`)
    $(".current .location-name").html(`Currently in ${weatherData.location.name}`);
    $(".current .last-updated").html(`Last updated ${weatherData.current.last_updated} ${weatherData.location.tz_id} time`);
    $(".present-details .degrees-f").html(weatherData.current.temp_f);
    $(".present-details .degrees-c").html(weatherData.current.temp_c);
    $(".feels-like .degrees-f").html(weatherData.current.feelslike_f);
    $(".feels-like .degrees-c").html(weatherData.current.feelslike_c);
    $(".addtl-present .rain").html(`Precipitation: ${weatherData.current.precip_in}%`);
    $(".addtl-present .humidity").html(`Humidity: ${weatherData.current.humidity}%`);
    $(".addtl-present .wind").html(`Wind: ${weatherData.current.wind_mph}mph ${weatherData.current.wind_dir}`);
}

function initListeners(){
    getLocation();
}

$(document).ready(function(){
    initListeners(); 
});