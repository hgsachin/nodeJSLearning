const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        const addr = encodeURIComponent(address);
        request({
            url: `http://maps.googleapis.com/maps/api/geocode/json?address=${addr}`,
            json: true
        }, (error, response, body) => {
            if(error){
                reject('Unable to connect to Google server');
            } else if(body.status === 'ZERO_RESULTS'){
                 reject('Unable to find the address');
            } else if(body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    Lattitude :  body.results[0].geometry.location.lat,
                    Longitude : body.results[0].geometry.location.lng
                });
            }
        });
    });
}

geocodeAddress('577428').then((location) => {
    console.log(JSON.stringify(location, undefined, 4));
}, (errorMsg) => {
    console.log(errorMsg);
})