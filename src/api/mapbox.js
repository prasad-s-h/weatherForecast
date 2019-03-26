
//Step 1
//here you will get long/lat as result from the endpoint 

const request = require('request');

const getLatLong = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.mapboxAPI}`;
    let mapboxMessage;
    request({url, json: true}, (error, { body } ) => {
        if(error) {
            mapboxMessage = `unable to connect to mapbox`;
            return callback(mapboxMessage);
        }else if(body.message || body.features.length === 0) {
            mapboxMessage = `unable to find location`;
            return callback(mapboxMessage);
        }else {
            mapboxMessage = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            };
            return callback(undefined, mapboxMessage);
        }
    });
};

module.exports = {getLatLong};
