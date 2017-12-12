const service = require('../server/service');
const http = require('http');
const slackClient = require('../server/slackclient');
const server = http.createServer(service);

const bot_token = 'xoxb-285375620146-OS8TsBpOYtnSZ6UKz4kTkd5z';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(bot_token, slackLogLevel);
rtm.start();

slackClient.addAuthenticatedhandler(rtm, () => server.listen(3000))
server.on('listening', () => {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} `)
});


//token : xoxb-285375620146-OS8TsBpOYtnSZ6UKz4kTkd5z
//curl \ -H 'Authorization: Bearer L65ZK6MHVBADW4MGFE3G2A2RG6TLYB4K' \ 'https://api.wit.ai/message?v=12/12/2017&q='