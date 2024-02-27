const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherapi.com/v1/current.json?q=' + latitude +","+ longitude + '&key=3d15c90b9ac54828be2102421241902'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                forecast: 'It is currently ' + body.current.temp_c + ' degress out. There is a ' + body.current.precip_in + '% chance of rain.',
                location: body.location.name+", "+body.location.region+", "+body.location.country,
                localtime: body.location.localtime
            }
                
            )
        }
    })
}

module.exports = forecast