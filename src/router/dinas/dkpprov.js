import { dkpProv } from '../../helper/ListAkses'
export default {
  path: '/dkp-prov/',
  meta: {
    adaMenu: true,
    auth: true,
    dkpprov: true,
    allowedRole: dkpProv.value
  },
  component: () => import('src/layouts/dinas/DKPProv.vue'),
  children: [
    {
      path: 'dashboard',
      name: dkpProv.index,
      component: () => import('pages/dkp/provinsi/Index.vue')
    },
    {
      path: 'kur',
      name: 'dataKURDKPProv',
      component: () => import('pages/dkp/provinsi/kur/Index.vue')
    },
    {
      path: 'kur/detail/:id',
      name: 'detailKURDKPProv',
      component: () => import('pages/sharedpages/kur/Detail.vue')
    }
  ]
}
