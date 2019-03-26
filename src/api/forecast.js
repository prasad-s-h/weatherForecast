
//Step 2
//get lat/long from mapbox.js and send lat/long to the endpoint to get weather updates

const request = require('request');

const getWeatherDetails = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${process.env.FORECASTAPI}/${latitude},${longitude}`;
    let forecastMessage = '';
    request({url, json: true}, (error, { body } ) => {
        if(error) {
            forecastMessage = `unable to connect to weather service`;
            return callback(forecastMessage);
        }else if(body.error) {
            forecastMessage = `unable to get the weather details`;
            return callback(forecastMessage);
        }else {
            const data = body.currently;
            forecastMessage = `${body.daily.data[0].summary} Right now,it's ${data.temperature} degrees out. There is ${data.precipProbability}% of rain`;
            return callback(undefined, forecastMessage);
        }
    });
};

module.exports = {getWeatherDetails};
