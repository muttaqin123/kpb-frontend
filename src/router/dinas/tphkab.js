import { tphKab } from '../../helper/ListAkses'
export default {
  path: '/tph-kabupaten/',
  meta: {
    adaMenu: true,
    auth: true,
    tphKab: true,
    allowedRole: tphKab.value
  },
  component: () => import('src/layouts/dinas/TPHKab.vue'),
  children: [
    {
      path: 'dashboard',
      name: tphKab.index,
      component: () => import('pages/tph/kabupaten/Index.vue')
    },
    {
      path: 'kur',
      name: `dataKUR${tphKab.name}`,
      component: () => import('pages/tph/kabupaten/kur/Index.vue')
    },
    {
      path: 'kur/detail/:id',
      name: 'detailKURTPHKabupaten',
      component: () => import('pages/sharedpages/kur/Detail.vue')
    },
    {
      path: 'ealokasi',
      name: `dataEAlokasi${tphKab.name}`,
      component: () => import('pages/tph/kabupaten/ealokasi/Index.vue')
    },
    {
      path: 'ealokasi/penebusan',
      name: `penebusanPuber${tphKab.name}`,
      component: () => import('pages/tph/kabupaten/ealokasi/Penebusan.vue')
    },
    {
      path: 'ealokasi/penebusan/detail/:idTransaksi',
      name: `detailPenebusanPuber${tphKab.name}`,
      component: () => import('pages/sharedpages/ealokasi/Detail.vue')
    }
  ]
}
