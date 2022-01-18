// express
import express, { Router } from 'express'
// sub routes
import authRouter from './auth'
import usersRouter from './users'

const router = Router()

router.use(express.json(), express.urlencoded({ extended: true }))
router.use('/auth', authRouter)

router.use('/users', usersRouter)

router.get('/', (req, res) => {
  res.send('<h1>Hello, VeeGram</h1>')
})


export default router