const baseURL = 'http://api.openweathermap.org/'
const APIkey = 'api-key'

let input = document.getElementById('cityInput')
input.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault()
    document.getElementById('search-btn').click()
  }
})

async function get_weather () {
  const cityObject = document.querySelector('.js-get-city')
  const city = cityObject.value
  cityObject.value = ''
  const urlWeather = `${baseURL}data/2.5/weather?q=${city}&appid=${APIkey}`

  const weather = await fetch(urlWeather).then(response => response.json())
  const { name, dt } = weather
  put_city_name(name, weather.sys.country)
  put_date_time(dt)
  const { temp, temp_min, temp_max } = weather.main
  put_temp(temp)
  put_weather(weather.weather[0].main)
  put_hi_lo(temp_max, temp_min)
}
function put_city_name (city, country) {
  document.getElementById('city').innerText = `${city}, ${country}`
}

function put_date_time (DateTime) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const dateTime = new Date(DateTime)
  const year = dateTime.getFullYear()
  const day = days[dateTime.getDay()]
  const month = months[dateTime.getMonth()]
  const date = dateTime.getDate()
  const hour = dateTime.getHours()
  const minute = dateTime.getMinutes()
  document.getElementById(
    'dates-times'
  ).innerText = `${day}, ${hour}:${minute} ,${date} ${month} ${year}`
}
function convertTemp (temperature) {
  temperature *= 100
  let temp = temperature - 27315
  temp /= 100
  return Math.round(temp)
}
function put_temp (temperature) {
  temp = convertTemp(temperature)
  document.getElementById('temperature').innerText = `${temp}°C`
}

function put_weather (weath) {
  document.getElementById('_weather').innerText = `${weath}`
}

function put_hi_lo (hi, lo) {
  let hig = convertTemp(hi)
  let low = convertTemp(lo)
  document.getElementById('high-min').innerText = `L:${low}°C / H:${hig}°C`
}
