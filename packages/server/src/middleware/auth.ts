import type { Handler } from 'express'

// TODO: allow for more flexibility handling authentication
interface IsAuthenticatedOptions {
  optional: boolean
}

export function isAuthenticated (options?: IsAuthenticatedOptions): Handler {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      if (options?.optional) {
        next()
      } else {
        res.sendStatus(401)
      }
    }
  }
}