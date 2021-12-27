import express from 'express'
import indexRouter from '@/routes'
import path from 'path'

const app = express()
// do NOT expose the server identity EXPRESS
// avoid any targeted attacks
app.disable('x-powered-by')


if (process.env.NODE_ENV === 'development') {
  void import('morgan').then(morganModule => {
    const logger = morganModule.default
    app.use(logger('common'))
  })
}


app.use('/_api', indexRouter)
app.use('/', express.static(path.join(__dirname, 'public')))

export default app