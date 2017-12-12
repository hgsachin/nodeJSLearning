var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
       // resolve('It worked');
       reject('This did not work');
    }, 2500);
});

somePromise.then((message) => {
    console.log('message : ', message);
}, (errorMessage) => {
    console.log(errorMessage);
})