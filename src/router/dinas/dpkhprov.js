import { dkpProv, dpkhProv } from '../../helper/ListAkses'
export default {
  path: '/dkph-provinsi/',
  meta: {
    adaMenu: true,
    auth: true,
    dpkhProv: true,
    allowedRole: dkpProv.value
  },
  component: () => import('src/layouts/dinas/DPKHProv.vue'),
  children: [
    {
      path: 'dashboard',
      name: dpkhProv.index,
      component: () => import('pages/dpkh/provinsi/Index.vue')
    },
    {
      path: 'kur',
      name: 'dataKURDPKHProv',
      component: () => import('pages/dpkh/provinsi/kur/Index.vue')
    },
    {
      path: 'kur/detail/:id',
      name: 'detailKURDPKHProv',
      component: () => import('pages/sharedpages/kur/Detail.vue')
    }
  ]
}
