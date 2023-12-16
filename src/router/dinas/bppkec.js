import { bppKec } from '../../helper/ListAkses'
export default {
  path: '/bpp-kecamatan/',
  meta: {
    adaMenu: true,
    auth: true,
    bppKec: true,
    allowedRole: bppKec.value
  },
  component: () => import('src/layouts/dinas/BPPKec.vue'),
  children: [
    {
      path: 'dashboard',
      name: bppKec.index,
      component: () => import('pages/bpp/Index.vue')
    },
    {
      path: 'kur',
      name: `dataKUR${bppKec.name}`,
      component: () => import('pages/bpp/kur/Index.vue')
    },
    {
      path: 'kur/detail/:id',
      name: `detailKUR${bppKec.name}`,
      component: () => import('pages/sharedpages/kur/Detail.vue')
    },
    // {
    //   path: 'ealokasi',
    //   name: `dataEAlokasi${bppKec.name}`,
    //   component: () => import('pages/bpp/ealokasi/Index.vue')
    // },
    {
      path: 'ealokasi/penebusan',
      name: `penebusanPuber${bppKec.name}`,
      component: () => import('pages/bpp/ealokasi/Penebusan.vue')
    },
    {
      path: 'ealokasi/penebusan/detail/:idTransaksi',
      name: `detailPenebusanPuber${bppKec.name}`,
      component: () => import('pages/sharedpages/ealokasi/Detail.vue')
    }
  ]
}
