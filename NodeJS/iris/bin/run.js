const service = require('../server/service');
const http = require('http');
const slackClient = require('../server/slackclient');
const server = http.createServer(service);

const witToken = 'L65ZK6MHVBADW4MGFE3G2A2RG6TLYB4K';

const witClient = require('../server/witClient')(witToken);

const bot_token = 'xoxb-285375620146-0RtVvirjBb7MJaRy0wLwpL3h';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(bot_token, slackLogLevel, witClient);
rtm.start();

slackClient.addAuthenticatedhandler(rtm, () => server.listen(3000))
server.on('listening', () => {
    console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} `)
});


//token : xoxb-285375620146-OS8TsBpOYtnSZ6UKz4kTkd5z
//curl \ -H 'Authorization: Bearer L65ZK6MHVBADW4MGFE3G2A2RG6TLYB4K' \ 'https://api.wit.ai/message?v=12/12/2017&q='