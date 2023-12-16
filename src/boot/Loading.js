import { boot } from 'quasar/wrappers'
import { QSpinnerTail, Loading } from 'quasar'

export default boot(async ({ app }) => {
  const opt = {
    spinner: QSpinnerTail
  }
  app.config.globalProperties.$showLoading = () => {
    return Loading.show(opt)
  }
  app.config.globalProperties.$hide = () => {
    return Loading.hide()
  }
})
