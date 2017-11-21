const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMsg, results) => {
    if(errorMsg){
        console.log(errorMsg);
    } else {
        console.log(`Address : ${results.address}`);
        weather.getWeather(results.Lattitude, results.Longitude, (errorMsg, weatherResults) => {
            if(errorMsg){
                console.log(errorMsg);
            } else {
                console.log(`Current temperature is ${weatherResults.temp} F. And it feels like ${weatherResults.apparentTemperature} F`)
            }
        });
    }
});
