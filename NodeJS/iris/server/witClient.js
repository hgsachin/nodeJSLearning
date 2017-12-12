const request = require('superagent');

function handleWitResponse(res) {
    console.log(JSON.stringify(res));
    return res;
}

module.exports = function witClient(token){
    var ask = function ask(message, cb) {
        request.get('https://api.wit.ai/message')
            .set('Authorization', 'Bearer ' + token)
            .query({v:'12/12/2017'})
            .query({q: message})
            .end((err, res) => {
                if(err) return cb(err);
                if(res.statusCode !== 200) return cb('Expected status 200, but got ' + res.statusCode);
                const witResponse = handleWitResponse(res.body.entities);
                cb(undefined, witResponse);
            })
        console.log('ask : ' + message);
        console.log('token : ' + token);
    }

    return {
        ask : ask
    }
}