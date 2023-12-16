import { boot } from 'quasar/wrappers'
export default boot(async ({ app, store }) => {
  function resetProv () {
    store.commit('area/updateProvinsi', null)
    resetKab()
  }

  function resetKab (all = true) {
    store.commit('area/updateKabupaten', null)
    if (all) store.commit('area/updateListKabupaten', [])
    resetKec()
  }

  function resetKec (all = true) {
    if (all) store.commit('area/updateListKecamatan', [])
    store.commit('area/updateKecamatan', null)
    resetDesa()
  }

  function resetDesa (all = true) {
    store.commit('area/updateDesa', null)
    if (all) store.commit('area/updateListDesa', [])
  }
  app.config.globalProperties.$resetArea = resetProv
  app.config.globalProperties.$resetKab = resetKab
  app.config.globalProperties.$resetKec = resetKec
  app.config.globalProperties.$resetDesa = resetDesa
  // () => {
  // store.commit('area/updateProvinsi', null)
  // store.commit('area/updateKecamatan', null)
  // store.commit('area/updateKabupaten', null)
  // store.commit('area/updateDesa', null)
  // store.commit('area/updateListKecamatan', [])
  // store.commit('area/updateListKabupaten', [])
  // store.commit('area/updateListDesa', [])
  // }
})
