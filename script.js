$(document).ready(function() {


    $("#search-button").on("click", function() {
        var city = $("#search-value").val().trim();

        console.log(city)

        searchWeather(city)

    })



    function searchWeather(city) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4b32a36858b5c8b19115b5b5ba1c2643&units=imperial"
        $.ajax({
            method: "GET",
            url: queryURL,
            dataType: "json"
        }).then(function(response){
            console.log(response)
            
            

            //build our html right here
            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");
            var cardTitle = $("<h3>").addClass("card-title").text(response.name);
            var temp = $("<p>").addClass("card-text").text("Temperature: " + Math.round(response.main.temp) + String.fromCharCode(176));
            var pressure = $("<p>").addClass("card-text").text("pressure: " + Math.round(response.main.pressure))
            var wind = $("</p>").addClass("card-text").text("wind: " + Math.round(response.wind.speed)); 
            var humidity = $("<p>").addClass("card-text").text("humidity: " + Math.round(response.main.humidity));
           
            
            $("#today").append(card.append(cardBody.append(cardTitle, temp, wind, humidity, pressure)))

            getForecast(response.coord.lat, response.coord.lon)
        })
    }

    function getForecast(lat, lon) {
        $.ajax({
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=4b32a36858b5c8b19115b5b5ba1c2643&units=imperial`,
            dataType: "json"
        }).then(function(response){
            console.log(response)

            for(var i = 1; i < 6; i++) {
                var dailyForecast = response.daily[i];

                var date = new Date(response.daily[i].dt).toLocaleDateString();
                console.log(date)


            }
        })
    }

})







