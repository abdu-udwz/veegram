import api from '@/common/services/api'
import { type AxiosResponse } from 'axios'
import { type User } from '@/common/types'

type UserInfo = Pick<User, 'username' | 'name' | 'password' > 

export function localSignUp (info: UserInfo): Promise<AxiosResponse<User>> {
  return api.post('auth/sign-up', info)
}

export function localSignIn (credentials: Pick<User, 'username' | 'password'>): Promise<AxiosResponse<User>> {
  return api.post('auth/sign-in', credentials)
}
