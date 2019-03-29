const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Roei'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'you should insert an address after the "/weather" ' 
        })
    }

    geocode(req.query.address, (geocodeError, {latitude, longitude, location}={}) => {
        if (geocodeError) {
            return res.send({
                error: geocodeError 
            })
        }

        forecast(latitude, longitude, (forecastError, forecastData) => {
            if (forecastError) {
                return res.send({
                    error: forecastError
                })
            }

            res.send({
                forecast: forecastData, 
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/about',(req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Roei'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'For any help call: blabla',
        title: 'Help',
        name: 'Roei'
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Roei'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Roei'
    })
})

app.listen(3000, ()=>{

})
