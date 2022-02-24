import api from './api'
import { type AxiosResponse, type AxiosRequestConfig, AxiosError } from 'axios'
import { User } from '@/common/types'

export function getSelf ( config?: AxiosRequestConfig): Promise<AxiosResponse<User> | AxiosError<User>> {
  return api.get('/users/me', config)
}

export function getOne (id: string, config?: AxiosRequestConfig): Promise<AxiosResponse<User> | AxiosError<User>> {
  return api.get(`/users/${id}`, config)
}