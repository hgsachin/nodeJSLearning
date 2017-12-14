module.exports.process = function process(intentData, cb){
    if(intentData.intent[0].value !== 'time'){
        return cb(new Error(`Expected time intent instead got ${intentData.intent[0].value}`));
    }
    if(!intentData.location) return cb(new Error('Missing Location in time intent'));

    return cb(false, `I don't yet know the time in ${intentData.location[0].value}`);
}