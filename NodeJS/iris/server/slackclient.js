const RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
let rtm = null;

const handleOnAuthenticated = (rtmStartData) => {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

const handleOnMessage = (message) => {
    console.log(message);

    rtm.sendMessage("Hello!", 'D8ED4RJUF');
}

const addAuthenticatedhandler = (rtm, handler) => {
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
}

module.exports.init = function slackClient(bot_token, logLevel) {
    rtm = new RtmClient(bot_token, { logLevel: logLevel });
    addAuthenticatedhandler(rtm, handleOnAuthenticated);
    rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
    return rtm;
}

module.exports.addAuthenticatedhandler = addAuthenticatedhandler;