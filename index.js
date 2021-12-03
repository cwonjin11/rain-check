
// let WEATHER_API_KEY = API_KEY
// console.log(API_KEY);

let weather = {

    // "apiKey": "3b979f483cbd8b14ae2e74db99fe0873",
    "apiKey": api.key,
    

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
        const {temp, temp_min, temp_max,humidity, feels_like} = data.main;
        const {speed} = data.wind;
        console.log(name, icon, description, temp, humidity, speed)
        document.querySelector(".city").innerHTML = "Weather in " + name;

        let now = new Date;
        let date = document.querySelector(".date");
        date.innerText = this.dateBuilder(now)

        document.querySelector(".temperature").innerHTML = `${Math.round(temp)}<span>°F</span>` + " "+ `(${Math.round(temp_min)}/${Math.round(temp_max)})`
        document.querySelector(".icon").src = 
            "http://openweathermap.org/img/wn/" + icon + ".png";
        // document.querySelector(".city").innerHTML = 
        // document.querySelector(".city").innerHTML = 
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".humidity").innerHTML = "Humidity : " + humidity + " %";
        document.querySelector(".wind").innerHTML = "Wind speed : " +speed+ " mph";
        document.querySelector(".weather").classList.remove("loading")
        document.querySelector(".feels-like").innerHTML = "Feels like : " + Math.round(feels_like) + "°F"
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +"')"
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
    dateBuilder: function(d) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        console.log(day)
        let date = d.getDate();
        let month = months[d.getMonth()]
        let year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`
    }

};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search()
})

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter") {
        weather.search();
    }
})

weather.fetchWeather("washington dc")