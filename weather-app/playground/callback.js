var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Sachin'
    };
    callback(user);
};

getUser(20, (user) => {
    console.log('User details :', user);
});