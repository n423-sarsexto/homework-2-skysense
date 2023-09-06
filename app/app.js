//navigation JS
/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    $("#sidebarNav").css("width","250px");
    $(".main").css("margin-left","250px");
}
  
/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    $("#sidebarNav").css("width","0");
    $(".main").css("margin-left","0");
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
            }).fail(function(e) {
                console.log( "error:", e );
                });
        }

        console.log(location, " is the location given.")
    })
    
}

function initListeners(){
    getLocation();
}

$(document).ready(function(){
    initListeners(); 
});