import { tphProv } from '../../helper/ListAkses'
export default {
  path: '/tph-provinsi/',
  meta: {
    adaMenu: true,
    auth: true,
    tphProv: true,
    allowedRole: tphProv.value
  },
  component: () => import('src/layouts/dinas/TPHProv.vue'),
  children: [
    {
      path: 'dashboard',
      name: tphProv.index,
      component: () => import('pages/tph/provinsi/Index.vue')
    },
    {
      path: 'kur',
      name: `dataKUR${tphProv.name}`,
      component: () => import('pages/tph/provinsi/kur/Index.vue')
    },
    {
      path: 'kur/detail/:id',
      name: `detailKUR${tphProv.name}`,
      component: () => import('pages/sharedpages/kur/Detail.vue')
    },
    {
      path: 'ealokasi',
      name: `dataEAlokasi${tphProv.name}`,
      component: () => import('pages/tph/provinsi/ealokasi/Index.vue')
    },
    {
      path: 'ealokasi/penebusan',
      name: `penebusanPuber${tphProv.name}`,
      component: () => import('pages/tph/provinsi/ealokasi/Penebusan.vue')
    },
    {
      path: 'ealokasi/penebusan/detail/:idTransaksi',
      name: `detailPenebusanPuber${tphProv.name}`,
      component: () => import('pages/sharedpages/ealokasi/Detail.vue')
    }
  ]
}
