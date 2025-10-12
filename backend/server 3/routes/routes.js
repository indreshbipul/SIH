import {Router} from 'express'

import controllers from '../controllers/controllers.js'


const route = Router()

route.get('/soilHealth/:prompt', controllers.soilHealth)

export default  route