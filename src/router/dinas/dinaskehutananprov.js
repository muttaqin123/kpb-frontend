import { dinasKehutananProv } from 'src/helper/ListAkses'
export default {
  path: '/dinaskehutanan-provinsi/',
  meta: {
    adaMenu: true,
    auth: true,
    dinaskehutananprov: true,
    allowedRole: dinasKehutananProv.value
  },
  component: () => import('src/layouts/dinas/DinasKehutananProv.vue'),
  children: [
    {
      path: 'dashboard',
      name: dinasKehutananProv.index,
      component: () => import('pages/kehutanan/provinsi/Index.vue')
    },
    {
      path: 'kur',
      name: 'dataKURDinasKehutananProv',
      component: () => import('pages/kehutanan/provinsi/kur/Index.vue')
    },
    {
      path: 'kur/detail/:id',
      name: 'detailKURDinasKehutananProv',
      component: () => import('pages/sharedpages/kur/Detail.vue')
    }
  ]
}
