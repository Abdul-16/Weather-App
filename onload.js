async function Default () {
  const baseURL = 'http://api.openweathermap.org/'
  const APIkey = 'api'
  const urlWeather = `${baseURL}data/2.5/weather?q=mumbai&appid=${APIkey}`

  const weather = await fetch(urlWeather).then(response => response.json())
  const { name, dt } = weather
  put_city_name(name, weather.sys.country)
  put_date_time(dt)
  const { temp, temp_min, temp_max } = weather.main
  put_temp(temp)
  put_weather(weather.weather[0].main)
  put_hi_lo(temp_max, temp_min)
}
window.onload = Default