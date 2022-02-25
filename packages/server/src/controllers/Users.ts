// express
import type { Request, Response } from 'express'
// services
import { getById as getUserById } from '@/services/Users'
// util
import mainLogger from '@/util/logger'
const logger = mainLogger.child({
  service: 'user-self-controller',
})

export async function get (req: Request, res: Response): Promise<any> {
  try {
    logger.info('user trying to fetch itself data', {
      userId: req.user!._id,
    })
    const user = await getUserById(req.user!._id)
    if (user != null) {
      const responseData = user.toObject()
      delete responseData.password
      // @ts-expect-error
      delete responseData.createdAt
      // @ts-expect-error
      delete responseData.updatedAt

      return res.json(user)
    } else {
      throw new Error('something while fetching user from database')
    }
  } catch (error: any) {
    logger.error('unknown error while fetching user self data', {
      userId: req.user?._id,
      error,
    })

    return res.sendStatus(500)
  }
}