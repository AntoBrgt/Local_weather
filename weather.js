const apiKey = "03373fd841f6504d52570f42a923b27a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card")

async function checkWeather(city){

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    var data = await response.json();

    // Exemple de timestamp Unix
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;

    let sunriseMiliSec = new Date(sunrise * 1000);
    let sunsetMiliSec = new Date(sunset * 1000);

    let timeSunrise = sunriseMiliSec.toLocaleTimeString();
    let timeSunset = sunsetMiliSec.toLocaleTimeString();

    let ActualDate = new Date((data.dt *1000))

    let actuelTime = ActualDate.toLocaleTimeString();


    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".hot").innerHTML = data.main.temp_max;
    document.querySelector(".cold").innerHTML = data.main.temp_min;
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".sunrise").innerHTML = timeSunrise;
    document.querySelector(".sunset").innerHTML = timeSunset;

    switch (data.weather[0].main){

        case "Clouds":

            if (actuelTime > timeSunset){
                weatherIcon.src = "images/CloudsAndMoon.png";
                break;
            }
            else {
                weatherIcon.src = "images/Clouds.png";
                card.style.background = "linear-gradient(#999999, #666666)";
                break;
            }
        
        case "Clear":

            if (actuelTime > timeSunset){
                weatherIcon.src = "images/Moon.png";
                break;
            }

            else {
                weatherIcon.src = "images/Clear.png";
                card.style.background = "linear-gradient(#ffbb00, #ff9100)";
                break;
            }

        
        case "Rain":

        if (actuelTime > timeSunset){
            weatherIcon.src = "images/RainAndMoon.png";
            break;
        }

        else {
            weatherIcon.src = "images/Rain.png";
            card.style.background = "linear-gradient(#999999, #666666)"
            break;
        }

    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keypress", (event)=>{
    if (event.key == "Enter"){
        checkWeather(searchBox.value);

    }
})
