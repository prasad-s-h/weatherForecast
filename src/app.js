
const path = require('path');
const hbs = require('hbs');
const express = require('express');
const {getLatLong} = require('./api/mapbox');
const {getWeatherDetails} = require('./api/forecast');

const port = process.env.PORT;
const app = express();
const publicFolderPath = path.join(__dirname, '../public');
const viewsFolderPath = path.join(__dirname, '../templates/views');
const partialsFolderPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsFolderPath);
hbs.registerPartials(partialsFolderPath);

app.use(express.static(publicFolderPath));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Prasad S H'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        message: 'Please view the documentation',
        name: 'Prasad S H'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Prasad S H'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) return res.send({error: 'please provide address'});
    
    getLatLong(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if(error) {
            return res.send({error: error});
        }else {
            getWeatherDetails(latitude, longitude, (error, forecast) => {
                if(error) {
                    return res.send({error: error});
                }else {
                    return res.send({location, forecast, address: req.query.address});
                }
            });
        }
    });

});

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: '404',
        name: 'Prasad S H',
        message: 'Help article not found'
    })
});

app.get('*', (req,res) => {
    res.render('error', {
        title: '404',
        name: 'Prasad S H',
        message: 'Page not found'
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

