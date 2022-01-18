// express
import { Router } from 'express'
// middleware
import * as auth from '@/middleware/auth'
const router = Router()

router.get('/', auth.isAuthenticated(), (req, res) => res.status(503).json('route not implemented yet'))

export default router