const request = require('request')

const geocode = (address, callback) => {
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2F0eWFtcGF0aGFrIiwiYSI6ImNrZDhvMXUycTBsY2wyenM4OWhwaW5nNXgifQ.Por91CgnHGkxjRmDEqDzJA&limit=1"

  request({ url: url, json: true }, (error, response, { features }) => {
    if (error) {
      callback('Connection Error', undefined)
    } else if (features.length === 0) {
      callback("Location Not found try with different search term", undefined)
    } else {
      callback(undefined, {
        location: (features[0].place_name),
        longitude: features[0].center[0],
        latitude: features[0].center[1]
      })
    }
  })
}

module.exports = geocode
