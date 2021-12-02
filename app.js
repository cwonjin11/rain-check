
let weather = {
    "apiKey": "3b979f483cbd8b14ae2e74db99fe0873",

    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            + "&units=imperial&appid=" 
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0]
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name, icon, description, temp, humidity, speed)
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".temperature").innerHTML = temp+ " °F"
        document.querySelector(".icon").src = 
            "http://openweathermap.org/img/wn/" + icon + ".png";
        // document.querySelector(".city").innerHTML = 
        // document.querySelector(".city").innerHTML = 
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".humidity").innerHTML = "Humidity : " + humidity + " %";
        document.querySelector(".wind").innerHTML = "Wind speed : " +speed+ " km/h";
        document.querySelector(".weather").classList.remove("loading")
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')"
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search()
}
)
document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter") {
        weather.search();
    }
})

weather.fetchWeather("washington dc")