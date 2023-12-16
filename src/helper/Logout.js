import { LocalStorage } from 'quasar'
import router from '../router/index'

export default function () {
  LocalStorage.clear()
  router().go({
    name: 'loginPage'
  })
}
