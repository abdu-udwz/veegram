// express
import { Router } from 'express'

import * as controller from '@/controllers/Authentication'

const router = Router()

router.post('/sign-up', controller.localSignUp)

router.post('/sign-in', controller.localSignIn)

export default router