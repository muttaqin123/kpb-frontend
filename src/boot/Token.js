import { boot } from 'quasar/wrappers'
import { parseProfile } from './Profile'
import { LocalStorage } from 'quasar'

const createToken = (params = {}) => {
  // console.log(params)
  return {
    headers: {
      'access-token': parseProfile().member.users_login.access_token,
      username: parseProfile().nik
    },
    params: params
  }
}

const createTokenPemasaran = (params = {}) => {
  const token = LocalStorage.getItem('member_pemasaran').token
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export default boot(async ({ app }) => {
  app.config.globalProperties.$createToken = createToken
  app.config.globalProperties.$createTokenPemasaran = createTokenPemasaran
})

export { createToken, createTokenPemasaran }
