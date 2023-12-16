import { boot } from 'quasar/wrappers'
// import alertPage from '../components/alert/Index'
// import cardInformation from '../components/card/Information'
// import dashboardDefault from '../components/pageComponent/dashboardDefault'
import menuUtama from '../components/card/MenuUtama'
import areaProvinsi from '../components/area/Provinsi.vue'
import areaKabupaten from '../components/area/Kabupaten.vue'
import areaKecamatan from '../components/area/Kecamatan.vue'
import areaDesa from '../components/area/Desa.vue'

export default boot(async ({ app }) => {
  // app.component('alertPage', alertPage)
  // app.component('cardInformation', cardInformation)
  // app.component('dashboardDefault', dashboardDefault)
  app.component('menuUtama', menuUtama)
  app.component('AreaProvinsi', areaProvinsi)
  app.component('AreaKabupaten', areaKabupaten)
  app.component('AreaKecamatan', areaKecamatan)
  app.component('AreaDesa', areaDesa)
})
