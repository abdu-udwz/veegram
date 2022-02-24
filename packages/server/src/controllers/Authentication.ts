// express
import { type Request, type Response } from 'express'
import passport from 'passport'
// services
import {
  createNewUser,
  signIn,
  getById as getUserById,
  type UserDocument as User,
  type UserInfo,
} from '@/services/Users'
// util
import mainLogger from '@/util/logger'
const logger = mainLogger.child({ service: 'authentication-controller' })

type ResponseUser = Pick<User, '_id' | 'username' | 'name'>

function prepareResponseUser (user: User): ResponseUser  {
  return {
    _id: user.id,
    username: user.username,
    name: user.name,
  }
}

type LocalSignUpReqBody = Partial<UserInfo>

export async function localSignUp (req: Request<any, any, LocalSignUpReqBody>, res: Response): Promise<any> {
  try {
    const { name, username, password } = req.body
    if (!name || !username || !password) {
      logger.info('failed to sign up with invalid user info, check request body')
      return res.sendStatus(400)
    }

    const result = await createNewUser({ name, username, password })
    if (Array.isArray(result)) {
      return res.status(400).json( {
        error: result,
      })
    } else {
      req.logIn(result, (error: any) => {
        if (error != null) {
          logger.log({
            level: 'error',
            message: 'unknown error writing passport session data during after successful sign up',
            error,
          })
          return res.sendStatus(500)
        } else {
          res.status(201).json({
            user: prepareResponseUser(result),
          })
        }
      })
      
    }
  } catch (error) {
    logger.log({
      level: 'error',
      message: 'unknown error during sign up',
      error,
    })
    return res.sendStatus(500)
  }
}

type LocalSignInReqBody = Partial<Pick<UserInfo, 'username' | 'password'>>

export async function localSignIn (req: Request<any, any, LocalSignInReqBody>, res: Response): Promise<any> {
  const { username, password } = req.body

  if (!username || !password) {
    logger.log({
      level: 'info',
      message: 'invalid sign in credentials empty or missing',
      username,
    })

    return res.sendStatus(400)
  }

  // console.log(`[Auth#localSignIn]: ${username} ${password}`)
  try {
    const result = await signIn({ username, password })

    if (result === false) {
      return res.status(403).json('INCORRECT_CREDENTIALS')
    } else {
      req.login(result, (error: any) => {
        if (error != null) {
          logger.log({
            level: 'error',
            message: 'unknown error writing passport session data after sign in',
            error,
          })
          return res.sendStatus(500)
        } else {
          const user = prepareResponseUser(result)
          return res.json(user)
        }
      })
    }
  } catch (error) {
    logger.log({
      level: 'error',
      error,
      message: 'unknown error during sign in',
    })
    return res.sendStatus(500)
  }
}

// =============================== //
// ==     session cookie data   == //
// =============================== //

passport.serializeUser((user, done) => {
  done(null, user._id.toString())
})

passport.deserializeUser((id: string, done) => {
  getUserById(id).then((user) => {
    done(null, user)
  }).catch((error) => {
    done(error)
  })
})