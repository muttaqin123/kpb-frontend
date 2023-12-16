import { dinasPerikananProv } from 'src/helper/ListAkses'
export default {
  path: '/perikanan-provinsi/',
  meta: {
    adaMenu: true,
    auth: true,
    dinasPerikananProv: true,
    allowedRole: dinasPerikananProv.value
  },
  component: () => import('src/layouts/dinas/PerikananProv.vue'),
  children: [
    {
      path: 'dashboard',
      name: dinasPerikananProv.index,
      component: () => import('pages/perikanan/provinsi/Index.vue')
    },
    {
      path: 'rolePeternakan',
      name: 'rolePerikanan',
      component: () => import('pages/sharedpages/role/PengajuanRole.vue')
    }
  ]
}
