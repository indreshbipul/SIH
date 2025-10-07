const weatherRoutes = require('express').Router()
const weatherControllers = require('../controllers/weatherControllers')

weatherRoutes.get('/realTime', weatherControllers.realTimeWeather)

module.exports = weatherRoutes