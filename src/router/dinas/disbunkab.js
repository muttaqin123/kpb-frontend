import { disbunKab } from 'src/helper/ListAkses'
export default {
  path: '/disbun-kabupaten/',
  meta: {
    adaMenu: true,
    auth: true,
    disbunkab: true,
    allowedRole: disbunKab.value
  },
  component: () => import('src/layouts/dinas/DisbunKab.vue'),
  children: [
    {
      path: 'dashboard',
      name: disbunKab.index,
      component: () => import('pages/disbun/kabupaten/Index.vue')
    },
    {
      path: 'kur',
      name: 'dataKURDisbunKab',
      component: () => import('pages/disbun/kabupaten/kur/Index.vue')
    },
    {
      path: 'kur/detail/:id',
      name: 'detailKURDisbunKab',
      component: () => import('pages/sharedpages/kur/Detail.vue')
    },
    {
      path: 'ealokasi',
      name: `dataEAlokasi${disbunKab.name}`,
      component: () => import('pages/tph/kabupaten/ealokasi/Index.vue')
    },
    {
      path: 'ealokasi/penebusan',
      name: `penebusanPuber${disbunKab.name}`,
      component: () => import('pages/tph/kabupaten/ealokasi/Penebusan.vue')
    },
    {
      path: 'ealokasi/penebusan/detail/:idTransaksi',
      name: `detailPenebusanPuber${disbunKab.name}`,
      component: () => import('pages/sharedpages/ealokasi/Detail.vue')
    }
  ]
}
