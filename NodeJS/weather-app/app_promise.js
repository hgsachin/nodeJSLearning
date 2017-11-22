const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
            .options({
                a: {
                    demand:true,
                    alias : 'address',
                    describe: 'Address to be fetched',
                    string: true
                }
            })
            .help()
            .argv;

var addr = encodeURIComponent(argv.address);
var geoURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${addr}`;

axios.get(geoURL).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find the address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var long = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/8b2a6157db6ed7de4fb777674a33b35f/${lat},${long}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
}).then((response) => {
    console.log('Current Temp : ' + response.data.currently.temperature);
    console.log('But feels like : ' + response.data.currently.apparentTemperature);
}).catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API server');
    } else {
        console.log(e.message);
    }
});