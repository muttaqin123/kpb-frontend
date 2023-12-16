import { boot } from 'quasar/wrappers'
import { LocalStorage } from 'quasar'
const storage = 'datauser'

const parseProfile = (sto = storage) => {
  return LocalStorage.getItem(sto)
}

const setProfile = (data, sto = storage) => {
  return LocalStorage.set(sto, data)
}

export default boot(async ({ app }) => {
  app.config.globalProperties.$getProfile = parseProfile
  // app.config.globalProperties.$getArea = () => {
  //   return parseProfile('area')
  // }
})

export { parseProfile, setProfile }
