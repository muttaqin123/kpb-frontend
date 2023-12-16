import { dpkhKab } from 'src/helper/ListAkses'
export default {
  path: '/dpkh-kabupaten/',
  meta: {
    adaMenu: true,
    auth: true,
    dpkhkab: true,
    allowedRole: dpkhKab.value
  },
  component: () => import('src/layouts/dinas/DPKHKab.vue'),
  children: [
    {
      path: 'dashboard',
      name: dpkhKab.index,
      component: () => import('pages/dpkh/kabupaten/Index.vue')
    },
    {
      path: 'kur',
      name: 'dataKURDPKHKab',
      component: () => import('pages/dpkh/kabupaten/kur/Index.vue')
    },
    {
      path: 'kur/detail/:id',
      name: 'detailKURDPKHPKab',
      component: () => import('pages/sharedpages/kur/Detail.vue')
    }
  ]
}
