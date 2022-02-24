// express
import { Router } from 'express'

import * as controller from '@/controllers/Users'

// middleware
const router = Router()

router.get('/', (req, res) => res.status(503).json('route not implemented yet'))

// user-self routes
router.get('/me', controller.get)

export default router