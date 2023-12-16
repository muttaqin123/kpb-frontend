import { disbunProv } from 'src/helper/ListAkses'
export default {
  path: '/disbun-provinsi/',
  meta: {
    adaMenu: true,
    auth: true,
    disbunprov: true,
    allowedRole: disbunProv.value
  },
  component: () => import('src/layouts/dinas/DisbunProv.vue'),
  children: [
    {
      path: 'dashboard',
      name: disbunProv.index,
      component: () => import('pages/disbun/provinsi/Index.vue')
    },
    {
      path: 'kur',
      name: 'dataKURDisbunProv',
      component: () => import('pages/disbun/provinsi/kur/Index.vue')
    },
    {
      path: 'kur/detail/:id',
      name: 'detailKURDisbunProv',
      component: () => import('pages/sharedpages/kur/Detail.vue')
    },
    {
      path: 'ealokasi',
      name: `dataEAlokasi${disbunProv.name}`,
      component: () => import('pages/tph/provinsi/ealokasi/Index.vue')
    },
    {
      path: 'ealokasi/penebusan',
      name: `penebusanPuber${disbunProv.name}`,
      component: () => import('pages/tph/provinsi/ealokasi/Penebusan.vue')
    },
    {
      path: 'ealokasi/penebusan/detail/:idTransaksi',
      name: `detailPenebusanPuber${disbunProv.name}`,
      component: () => import('pages/sharedpages/ealokasi/Detail.vue')
    }
  ]
}
