import { boot } from 'quasar/wrappers'
import { notif } from './Notify'
import logout from '../helper/Logout'
const parseResponse = (res, useMsg = true) => {
  if (res.status) {
    if (useMsg) notif(res.message, 'positive')
    return true
  } else {
    if (res.code === 401) {
      notif(res.message, 'negative')
      logout()
      return false
    } else {
      notif(res.message, 'negative')
      return false
    }
  }
}
export default boot(async ({ app }) => {
  app.config.globalProperties.$parseResponse = parseResponse
})

export { parseResponse }
