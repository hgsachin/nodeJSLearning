const request = require('request');

var getWeather = (lat, long, callback) => {
    request({
        url: `https://api.darksky.net/forecast/8b2a6157db6ed7de4fb777674a33b35f/${lat},${long}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temp : body.currently.temperature,
                apparentTemperature : body.currently.apparentTemperature
            });
        } else {
            callback('Unable to find the address');
        }
    });
}

module.exports.getWeather = getWeather;