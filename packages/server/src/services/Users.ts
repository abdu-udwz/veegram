// Users service

// models
import User, { type UserDocument } from '@/models/User'
export { UserDocument } from '@/models/User'
// util
import mainLogger from '@/util/logger'
const logger = mainLogger.child({ service: 'users-service' })

export interface UserInfo {
  username: string
  name: string
  password: string
}

export async function createNewUser (userInfo: UserInfo): Promise<UserDocument | string[]> {
  let user = new User()

  const validationErrors: string[] = []

  // ======== validate name / username ===== //
  const { name, username } = userInfo
  user.username = username
  if (!isValidUsername(user.username)) {
    validationErrors.push('INVALID_USERNAME')
  }

  // check if username already exists
  const foundUserName = await User.findOne({ username })
  if (foundUserName) {
    validationErrors.push('USERNAME_ALREADY_EXIST')
  }

  user.name = name
  if (!isValidName(user.name)) {
    validationErrors.push('INVALID_NAME')
  }
  // ============================= //

  // ============= password validation =============== //
  user.password = userInfo.password
  if (!isValidPassword(user.password)) {
    validationErrors.push('INVALID_PASSWORD')
  }
  // ================================================= //

  if (validationErrors.length === 0) {
    user = await user.save()
    logger.log({
      level: 'info',
      message: 'created new user successfully',
      userId: user._id,
      username: user.username,
    })
    return user
  } else {
    logger.log({
      level: 'info', 
      message: 'failed to create new user',
      username: userInfo.username,
      errors: validationErrors,
    })
    return validationErrors
  }
}

export async function signIn (credentials: Pick<UserInfo, 'username' | 'password'>): Promise<UserDocument | false> {
  let { username } = credentials

  username = username.toLocaleLowerCase()
  const user = await User.findOne({ username }).select('+password')

  if (!user) {
    logger.log({
      level: 'info',
      message: 'attempt to sign in to a non-existing user',
      username,
    })
    return false
  }

  console.log('sfasdfasdf sign in ')

  const { password } = credentials
  const passwordCheck = await user.comparePassword(password)

  if (passwordCheck) {
    user.lastLogin = new Date()
    await user.save()

    return user
  } else {
    logger.log({
      level: 'info',
      message: 'attempt to sign in with wrong password',
      userId: user.id,
      username: user.username,
    })
    return false
  }
}

export async function getById (id: string) : Promise<UserDocument | null | undefined> {
  const user = await User.findById(id)
  return user
}

export async function getByUsername (username: string): Promise<UserDocument | null | undefined> {
  const user = await User.findOne({ username: username.toLocaleLowerCase() })
  return user
}

// === validation functions ===== //
export function isValidUsername (username: string): boolean {
  const realVal = username.trim()
  if (!username || realVal.length < 3 || realVal.length > 32)
    return false

  const specialRegex = /[^_.a-z0-9]/i
  return !specialRegex.test(realVal)
}

export function isValidName (name: string): boolean {
  const realVal = name.trim()
  if (!name || realVal.length < 2 || realVal.length > 32)
    return false

  // check if it contains any of these special chars
  const specialRegex = /[!@#$%^&*_+\-=[\]{};':.,()"\\|<>/?]/
  return !specialRegex.test(realVal)
}

export function isValidPassword (password?: string): boolean {
  if (!password || password.length < 8 || password.length > 64)
    return false

  // if it contains any chars that aren't listed here
  // user is trying to input invalid chars.
  const passwordRegex = /[!@#$%^&*_ \-=."\\|?a-zA-Z0-9]/
  return passwordRegex.test(password)
}
