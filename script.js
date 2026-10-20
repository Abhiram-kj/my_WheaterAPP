const apiKey = "24841dad8b795f19433744f5af6ba2a4"; 

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weather-icon");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

async function checkWeather(city) {
    if (!city) return;
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            alert("City not found!");
            return;
        }
        
        
        const data = await response.json();

       
        cityName.innerText = `${data.name}, ${data.sys.country}`;
        temperature.innerText = `${Math.round(data.main.temp)}°C`;
        description.innerText = data.weather[0].description;
        humidity.innerText = `${data.main.humidity}%`;
        windSpeed.innerText = `${data.wind.speed} m/s`;

      
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.style.display = "block";

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(cityInput.value);
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(cityInput.value);
    }
});