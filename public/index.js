const loc = document.querySelector('#location');
const icon = document.querySelector('#icon');
const temp = document.querySelector('#temp');
const feelsLike = document.querySelector('#feels-like');
const description = document.querySelector('#description');
const forecast = document.querySelectorAll('.forecast');

const API_BASE_URL = '';

// On load, get geo location and ask backend for weather & forecast
navigator.geolocation.getCurrentPosition(res => {

  // 
  getLocalWeather(res.coords.latitude, res.coords.longitude)
    .then(weather => {

      // Ok. We have weather...
      if (weather.status === 'success') {
        loc.innerText = weather.location;
        icon.src = weather.icon;
        temp.innerHTML = `${weather.temperature}&deg;${weather.unit}`;
        feelsLike.innerHTML = `${weather.feelslike}&deg;${weather.unit}`;
        description.innerText = weather.description;

        // Populate forecasts backwards
        let i = 3;
        while (weather.forecast.length && i > -1) {
          const item = weather.forecast.pop();
          forecast[i].style.backgroundImage = `url("${item.icon}")`;
          forecast[i].childNodes[1].innerText = item.weekday;
          forecast[i].childNodes[3].innerText =
            `${item.low} till ${item.high}`;
          i--;
        }
      }
    });
});

/*
 * Helper function - API call
 */
const getLocalWeather = async (lat, lon) => {
  let endpoint = API_BASE_URL + '/local-weather';

  endpoint += "/" + lat;
  endpoint += "/" + lon;

  const res = await fetch(endpoint);
  const json = await res.json();

  return json;
};