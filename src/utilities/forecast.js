const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=823703eb293daa00fd4e4e082e133956&units=metric"
  request({ url: url, json: true }, function (error, response, { message, main, weather }) {
    if (error) {
      callback("Error connecting , check your internet connection", undefined);
    } else if (message) {
      callback('Unable to find the location', undefined)
    } else {
      callback(undefined, {
        clouds: weather[0].description,
        temp: main.temp,
        visual: weather[0].icon,
        // feelslike: main.feels_like, 
        mintemp: main.temp_min,
        maxtemp: main.temp_max
      })
    }
  })
}

module.exports = forecast