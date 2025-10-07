const soilRoutes = require('express').Router()
const soilControllers = require('../controllers/soilControllers')

soilRoutes.get('/soilType', soilControllers.soilTypes)
soilRoutes.get('/soilProp',soilControllers.soilProperties)

module.exports = soilRoutes