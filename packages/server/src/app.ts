import express from 'express'
import indexRouter from '@/routes'
import path from 'path'
import logger from '@/middleware/logger'

import session from 'express-session'
import MongoSessionStore from 'connect-mongo'
import passport from 'passport'

const app = express()
// do NOT expose the server identity EXPRESS
// avoid any targeted attacks
app.disable('x-powered-by')

app.use(session({
  secret: [process.env.SECURITY_SESSION_SECRET ?? '$secret.foo.bar.baz', ...(process.env.SECURITY_SESSION_SECRETSET ?? '').split(';')],
  resave: false,
  saveUninitialized: false,
  store: MongoSessionStore.create({
    mongoUrl: process.env.DATABASE_MONGO_URL,
  }),
}))
app.use(passport.initialize())
app.use(passport.session())

// Enable morgan logging
app.use(logger)
app.use('/_api', indexRouter)
app.use('/', express.static(path.join(__dirname, 'public')))

export default app