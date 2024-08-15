import { ApiUser } from "./user.types"

export interface RegisterApiReq {
  email: string
  newPassword: string
  fullname: string
}

export interface LoginApiReq {
  email: string
  password: string
}

export interface LoginApiRes {
  user: ApiUser
  access_token: string
}
