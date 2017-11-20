const yargs = require('yargs');
const geocode = require('./geocode/geocode');

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
        console.log(JSON.stringify(results, undefined, 4));
    }
});