import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'

const notif = (message = 'Unknown Message', jenis = 'positive') => {
  return Notify.create({
    message: message,
    color: jenis,
    timeout: 2000,
    actions: [{ icon: 'close', color: 'white' }]
  })
}

export default boot(async ({ app }) => {
  app.config.globalProperties.$notif = notif
  app.config.globalProperties.$commonErrorNotif = () => {
    notif('Terjadi Kesalahan Mohon Periksa Koneksi Internet Anda', 'negative')
  }
})
export { notif }
