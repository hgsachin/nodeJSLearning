const request = require('request');

const geocodeAddress = (address, callback) => {
    const addr = encodeURIComponent(address);
    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${addr}`,
        json: true
    }, (error, response, body) => {
        if(error){
            callback('Unable to connect to Google server');
        } else if(body.status === 'ZERO_RESULTS'){
             callback('Unable to find the address');
        } else if(body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                Lattitude :  body.results[0].geometry.location.lat,
                Longitude : body.results[0].geometry.location.lng
            });
        }
    });
}

module.exports.geocodeAddress = geocodeAddress;