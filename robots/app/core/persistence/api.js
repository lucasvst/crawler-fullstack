const request = require('request');

const write = config => data => {

    const myData = [...data];

    myData.reduce((prev, cur, i, arr) => {

        const options = {
            headers: {
                'Content-Type' : 'application/json'
            },
            url: `${config.hostname}:${config.port}${config.path}`,
            json: arr.splice(1,100)
        };

        request.post(options, (err, res, body) => {

            if(err) { console.log(err); }

        });

        return arr;
    })
}

module.exports = write;