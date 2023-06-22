const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const errLocation = document.querySelector(".weather404 h1");
const weather404 = document.querySelector(".weather404");
const weatherInfo = document.querySelector(".weather-info");

search.addEventListener('click', () => {

  const APIKey = "86f31747f3b4b23558486e814f8cbe04";
  const city = document.querySelector(".search-box input").value;

  if (city === '')
    return;

  fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

    if (json.cod === '404'){
      weatherInfo.style.display = 'none';
      weather404.style.display = 'block';
      document.querySelector('.weather-heading img').src = '';
      return;
    }
    
    weatherInfo.style.display = 'block';
    weather404.style.display = 'none';
    
    const image = document.querySelector('.weather-heading img');
    const temperature = document.querySelector('.weather-temp-box span');
    const description = document.querySelector('.weather-desc-box span');
    const humidity = document.querySelector('.weather-hum-box span');
    const wind = document.querySelector('.weather-wind-box span');

    switch(json.weather[0].main){
      case 'Clear':
        image.src = 'images/clear.png';
        break;
      case 'Rain':
        image.src = 'images/rain.png';
        break;
      case 'Snow':
        image.src = 'images/snow.png';
        break;
      case 'Clouds':
        image.src = 'images/clouds.png';
        break;
      case 'Haze':
        image.src = 'images/haze.png';
        break;
      case 'Mist':
        image.src = 'images/mist.png';
        break;
      default:
        image.src = '';

    }

    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`
    humidity.innerHTML = `${json.main.humidity}`;
    wind.innerHTML = `${json.wind.speed}Km/h`;

  });

});