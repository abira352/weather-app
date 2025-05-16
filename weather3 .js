const container = document.getElementById('weatherDisplay');
const weathericon = document.getElementById('weather-icon');
const cityname = document.getElementById('cityname');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const description = document.getElementById('description');
const submit = document.getElementById('submit');
const search = document.getElementById('search');
const errorMessage = document.getElementById('error-message');

async function checkweather(city) {
    const apikey = "ad25bbf13ceb5774ba004e89ce034ef2"; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        console.log(data);

        cityname.innerHTML = `${data.name}`;
        temperature.innerHTML = `${Math.round(data.main.temp)} °C`;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = ` ${data.wind.speed} km/h`;
        description.innerHTML = `${data.weather[0].description}`;

      if (data.weather[0].main == "Clouds") {
    weathericon.src = "images/cloud.png";
} else if (data.weather[0].main == "Clear") {
    weathericon.src = "images/clear.png";
} else if (data.weather[0].main == "Rain") {  // Capital R here
    weathericon.src = "images/rain.webp";
} else if (data.weather[0].main == "Mist") {
    weathericon.src = "images/mist.png";
} else if (data.weather[0].main == "Snow") {
    weathericon.src = "images/snow.png";
} else {
    weathericon.src = "images/cloud.png"; // Default icon if no match
}


        // Show the weather display
        container.classList.remove('hidden');
        errorMessage.classList.add('hidden'); // Hide error message if successful
    } catch (error) {
        errorMessage.innerHTML = error.message;
        errorMessage.classList.remove('hidden'); // Show error message
        container.classList.add('hidden'); // Hide weather display on error
    }
}

// Event listener for the submit button
submit.addEventListener('click', function() {
    const city = search.value.trim();
    if (city) {
        checkweather(city);
    } else {
        errorMessage.innerHTML = 'Please enter a city name.';
        errorMessage.classList.remove('hidden');
    }
});

// Optional: Allow pressing Enter to submit the search
search.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        submit.click();
    }
});
