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

//https://api.weatherapi.com/v1/current.json?key=4ccde8f188014b72810193654232808&q=46202&aqi=no
const baseURL = `https://api.weatherapi.com/v1/forecast.json?key=`;
const apiKey = `4ccde8f188014b72810193654232808`;
