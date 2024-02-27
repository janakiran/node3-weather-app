const request = require('request')

const geocode = (lat, long, callback) => {
    const url = 'https://api.weatherapi.com/v1/search.json?q=' + lat +","+ long + '&key=3d15c90b9ac54828be2102421241902'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: body[0].name
            })
        }
    })
}

module.exports = geocode