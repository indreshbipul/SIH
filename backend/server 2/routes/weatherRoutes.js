const weatherRoutes = require('express').Router()
const weatherControllers = require('../controllers/weatherControllers')

weatherRoutes.get('/realTime', weatherControllers.realTime)
weatherRoutes.get('/forcast', weatherControllers.forcast)
weatherRoutes.get('/timeLine', weatherControllers.timeLine)

module.exports = weatherRoutes