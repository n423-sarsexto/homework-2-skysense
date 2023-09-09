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

    //retrieve current hour
    let curDate = new Date(weatherData.current.last_updated);
    let curHour = curDate.getHours();
    let futureCode = '';

    //create hourly forecast
    for(let i = 0; i < 6; i++){
        //don't loop through midnight of the current day
        if(i + curHour < 23){
            time = new Date(weatherData.forecast.forecastday[0].hour[curHour + i].time);
            hourTime = time.getHours();
            futureCode += `<div class="hour">
            <img src=${weatherData.forecast.forecastday[0].hour[curHour + i].condition.icon}>
            <p>${weatherData.forecast.forecastday[0].hour[curHour + i].temp_f}<sup>°F</sup> | ${weatherData.forecast.forecastday[0].hour[curHour + i].temp_c}<sup>°C</sup></p>
            <p>${weatherData.forecast.forecastday[0].hour[curHour + i].condition.text}</p>
            <h6>${hourTime}:00</h6>
            </div>`
        }//go through the remaining hours
        else{
            hourTime = (i + curHour) - 23;
            futureCode += `<div class="hour">
            <img src=${weatherData.forecast.forecastday[0].hour[hourTime].condition.icon}>
            <p>${weatherData.forecast.forecastday[0].hour[hourTime].temp_f}<sup>°F</sup> | ${weatherData.forecast.forecastday[0].hour[hourTime].temp_c}<sup>°C</sup></p>
            <p>${weatherData.forecast.forecastday[0].hour[hourTime].condition.text}</p>
            <h6>${hourTime}:00</h6>
            </div>`
        }
        
    }

    // current details html
    $(".current").html(`<div class="split-1">
    <h2><span class="location-name">${weatherData.location.name} - ${weatherData.current.condition.text}</span></h2>
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
        <div class="column">
            <p><strong>High:</strong> ${weatherData.forecast.forecastday[0].day.maxtemp_f}<sup>°F</sup> | ${weatherData.forecast.forecastday[0].day.maxtemp_c}<sup>°C</sup></p>
            <p><strong>Average:</strong> ${weatherData.forecast.forecastday[0].day.avgtemp_f}<sup>°F</sup> | ${weatherData.forecast.forecastday[0].day.avgtemp_c}<sup>°C</sup></p>
            <p><strong>Low:</strong> ${weatherData.forecast.forecastday[0].day.mintemp_f}<sup>°F</sup> | ${weatherData.forecast.forecastday[0].day.mintemp_c}<sup>°C</sup></p>
        </div>
        <div class="column">
        <p class="rain">Precipitation: ${weatherData.current.precip_in}%</p>
        <p class="humidity">Humidity: ${weatherData.current.humidity}%</p>
        <p class="wind">Wind: ${weatherData.current.wind_mph} MPH ${weatherData.current.wind_dir}</p></div>
        
    </div>
</div>
<div class="split-2">
    <div class="row">
    <h4 style="margin-bottom: 1px;">Six-hour forecast...</h4>
    <p class="last-updated">Last updated ${weatherData.current.last_updated} ${weatherData.location.tz_id} time</p></div>
    <div class="hourly">
    ${futureCode}</div>
    <div class="sun-facts">
        <p>Sunrise: ${weatherData.forecast.forecastday[0].astro.sunrise}</p>
        <p>Sunset: ${weatherData.forecast.forecastday[0].astro.sunset}</p>
        <p>Moonrise: ${weatherData.forecast.forecastday[0].astro.moonrise}</p>
        <p>Moonset: ${weatherData.forecast.forecastday[0].astro.moonset}</p>
    </div>
</div>`);

    // future details
    //first, reset old future forecast
    $(".future").html("");
    //then, get new future forecast data
    for(let i = 1; i < weatherData.forecast.forecastday.length; i++){
        //calculate day of the week
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let dateFix = i + 1;
        let futureDay = (new Date(weatherData.forecast.forecastday[i].date).getDay()) +1;

        //for each, append the elements inside of a new "day" element
        $(".future").append(`<div class="day">
            <div class="date"><h2>${days[futureDay]}</h2></div>
            <div class="temperatures">
                <div class="temp-img"><img src="${weatherData.forecast.forecastday[i].day.condition.icon}" alt="${weatherData.forecast.forecastday[i].day.condition.text}"></div>
                <div class="temp-info">
                    <h3>${weatherData.forecast.forecastday[i].day.condition.text}</h3>
                    <h4>${weatherData.forecast.forecastday[i].day.avgtemp_f}<sup>°F</sup> | ${weatherData.forecast.forecastday[i].day.avgtemp_c}<sup>°C</sup></h4>
                    <p>High: ${weatherData.forecast.forecastday[i].day.maxtemp_f}<sup>°F</sup> | ${weatherData.forecast.forecastday[i].day.maxtemp_c}<sup>°C</sup></p>
                    <p>Low: ${weatherData.forecast.forecastday[i].day.mintemp_f}<sup>°F</sup> | ${weatherData.forecast.forecastday[i].day.mintemp_c}<sup>°C</sup></p>
                </div>
            </div>
            <div class="statistics">
                <div class="stat">
                    <p>${weatherData.forecast.forecastday[i].day.avghumidity}%</p>
                    <h4>Humidity</h4>
                </div>
                <div class="stat">
                    <p>${weatherData.forecast.forecastday[i].day.maxwind_mph} MPH</p>
                    <h4>Wind</h4>
                </div>
                <div class="stat">
                    <p>${weatherData.forecast.forecastday[i].day.totalprecip_in} in.</p>
                    <h4>Rainfall</h4>
                </div>
                <div class="stat">
                    <p>${weatherData.forecast.forecastday[i].day.totalsnow_cm} cm.</p>
                    <h4>Snowfall</h4>
                </div>
                <div class="stat">
                    <p>${weatherData.forecast.forecastday[i].day.daily_chance_of_rain}%</p>
                    <h4>Chance of Rain</h4>
                </div>
                <div class="stat">
                    <p>${weatherData.forecast.forecastday[i].day.daily_chance_of_snow}%</p>
                    <h4>Chance of Snow</h4>
                </div>
            </div>
            <div class="bottom-row">
                <p>Sunrise: ${weatherData.forecast.forecastday[i].astro.sunrise}</p>
                <p>Sunset: ${weatherData.forecast.forecastday[i].astro.sunset}</p>
                <p>Moonrise: ${weatherData.forecast.forecastday[i].astro.moonrise}</p>
                <p>Moonset: ${weatherData.forecast.forecastday[i].astro.moonset}</p>
                <p>Moon Phase: ${weatherData.forecast.forecastday[i].astro.moon_phase}</p>
            </div>
        </div>`);
    }
}

function initListeners(){
    getLocation();
}

$(document).ready(function(){
    initListeners(); 
});