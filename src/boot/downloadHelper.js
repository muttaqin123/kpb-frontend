// import { exportFile } from 'quasar'

// export default async ({ Vue }) => {
//   const exportToCsv = (filename, content, showNotif, notif) => {
//     const status = exportFile(
//       filename,
//       content,
//       'text/csv'
//     )
//     if (!status) {
//       showNotif('gagal', 'success', notif)
//     }
//   }
//   Vue.prototype.$exportToCsv = exportToCsv
// }

import { boot } from 'quasar/wrappers'
import { exportFile } from 'quasar'

const exportToCsv = (filename, data) => {
  exportFile(filename, data, 'text/csv')
}

export default boot(async ({ app }) => {
  app.config.globalProperties.$exportToCsv = exportToCsv
})

export { exportToCsv }
