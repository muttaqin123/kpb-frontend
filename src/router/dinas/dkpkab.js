import { dkpKab } from '../../helper/ListAkses'
export default {
  path: '/dkp-kabupaten/',
  meta: {
    adaMenu: true,
    auth: true,
    dkpkab: true,
    allowedRole: dkpKab.value
  },
  component: () => import('src/layouts/dinas/DKPKab.vue'),
  children: [
    {
      path: 'dashboard',
      name: dkpKab.index,
      component: () => import('pages/dkp/kabupaten/Index.vue')
    },
    {
      path: 'kur',
      name: 'dataKURDKPKab',
      component: () => import('pages/dkp/kabupaten/kur/Index.vue')
    },
    {
      path: 'kur/detail/:id',
      name: 'detailKURDKPKab',
      component: () => import('pages/sharedpages/kur/Detail.vue')
    }
  ]
}
