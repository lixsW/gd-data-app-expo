import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/index'
import useFetch from '@/api/useFetch'
import queryString from 'query-string'

interface PayLoadType {
  password: string
  username?: string
  companyMail?: string
  smscode?: string
}

interface LoginState {
  loginState: boolean
  token: string
}

const initialState: LoginState = {
  loginState: false,
  token: '',
}

// 登录
const loginAction = (state: LoginState, action: PayloadAction<PayLoadType>) => {
  const params: any = { ...action.payload }
  const apiUrl = 'http://211.140.29.44:9999/prod-api/auth/login'
  const paramsString = JSON.stringify(params)
  //发送登录api接口
  //   useFetch(apiUrl, {
  //     method: 'post',
  //     body: paramsString,
  //   }).then((res: any) => {
  //     console.log(res)
  //   })
  //登录成功 修改登录状态
  state.loginState = true
  //保存token
  state.token = `
  eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJuaWNrbmFtZSI6IumrmOeJueeUteWtkCIsImNvbXBhbnljb2RlIjoiZ29sZCIsInRlbmFudGlkIjo5OTk5LCJkc2tleSI6Im1hc3RlciIsInBsYXRmb3JtdXNlcmlkIjoxLCJwbGF0Zm9ybXVzZXJuYW1lIjoiYWRtaW4iLCJwZXJtaXNzaW9uc1JlZGlzS2V5IjoicGVybWlzc2lvbjoxIiwicm9sZXMiOlsiYWRtaW4iXSwidG9rZW5SZWRpc0tleSI6ImxvZ2luX3Rva2VuczplYjlmNGE5MS03MWRkLTQyNjYtYWM0OS0zNTliY2RmYjJhYTYifQ.jwaV4zpsR2T8qlKuFPZsnK1jQgkyaYgU2AJIEH94to2-kL2gouQ1DYLiuYkTppfZm9EzK_Aa_r8VKQLbMEiFlQ`
}


// 退出登录
const logoutAction = (state:LoginState)=>{
    state.loginState = false
    state.token = ""
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: { login: loginAction ,logout:logoutAction},
})

export const { login ,logout} = loginSlice.actions

export default loginSlice.reducer
