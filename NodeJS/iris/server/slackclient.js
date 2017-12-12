const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
let rtm = null;
let nlp = null;

const handleOnAuthenticated = (rtmStartData) => {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

const handleOnMessage = (message) => {
    nlp.ask(message.text, (err, res) => {
        if(err){
            console.log(err);
            return;
        }
        if (!res.intent){
            console.log(res.intent);
            return rtm.sendMessage("Sorry I don't understand what you are saying", message.channel);
        } else if(res.intent[0].value == 'time ' && res.location){
            return rtm.sendMessage(`Don't yet know the time in location ${res.location[0].value}`, message.channel);
        } else {
            return rtm.sendMessage("Sorry I don't understand what you are saying as we dont know the intent", message.channel);
        }
    });

}

const addAuthenticatedhandler = (rtm, handler) => {
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

module.exports.init = function slackClient(bot_token, logLevel, nlpClient) {
    rtm = new RtmClient(bot_token, { logLevel: logLevel });
    nlp = nlpClient;
    addAuthenticatedhandler(rtm, handleOnAuthenticated);
    rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
    return rtm;
}

module.exports.addAuthenticatedhandler = addAuthenticatedhandler;