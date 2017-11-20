const request = require('request');
const yargs = require('yargs');

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
        
const addr = encodeURIComponent(argv.address);

request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${addr}`,
    json: true
}, (error, response, body) => {
    if(error){
        console.log('Unable to connect to Google server');
    } else if(body.status === 'ZERO_RESULTS'){
        console.log('Unable to find the address');
    } else if(body.status === 'OK') {
        console.log(`Address : ${body.results[0].formatted_address}`);
        console.log('Lattitude : ', body.results[0].geometry.location.lat);
        console.log('Longitude : ', body.results[0].geometry.location.lng);
    }
});