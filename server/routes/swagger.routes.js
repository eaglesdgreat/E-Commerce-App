import express from 'express'
import swaggerUi from 'swagger-ui-express'
import Yaml from 'yamljs'

import swaggerDoc from './../swagger.yaml'

const router = express.Router()
const swaggerDocument = Yaml.load(swaggerDoc)

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default router
