import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import area from './area'
import verified from './verified'

export default store(function () {
  const Store = createStore({
    modules: {
      area,
      verified
    },
    strict: process.env.DEBUGGING
  })

  return Store
})
