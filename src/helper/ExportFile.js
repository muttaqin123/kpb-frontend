import { exportFile } from 'quasar'
import { notif } from '../boot/Notify'
export default function (filename, content) {
  const status = exportFile(
    filename,
    content,
    'text/csv'
  )
  if (!status) {
    notif('Gagal Export', 'negative')
  }
}
