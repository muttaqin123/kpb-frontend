import { adminSijelabat } from 'src/helper/ListAkses'
export default {
  path: '/adminsijelabat/',
  meta: {
    adaMenu: true,
    auth: true,
    adminsijelabat: true,
    allowedRole: adminSijelabat.value
  },
  component: () => import('src/layouts/AdminSijelabat.vue'),
  children: [
    {
      path: 'dashboard',
      name: adminSijelabat.index,
      component: () => import('pages/member/sijelabat/Admin/Dashboard.vue')
    },
    {
      path: 'profil-usaha/unverifikasi',
      name: 'AdminSijelabatProfilUsahaUnverifikasi',
      component: () => import('pages/member/sijelabat/Admin/ProfilUsaha/unVerifProfilUsaha.vue')
    },
    {
      path: 'profil-usaha/detail/:idpu',
      name: 'AdminSejelabatProfilUsahaDetail',
      component: () => import('pages/member/sijelabat/Admin/ProfilUsaha/detailPU.vue')
    },
    {
      path: 'profil-usaha/list',
      name: 'AdminSejelabatProfilUsaha',
      component: () => import('pages/member/sijelabat/Admin/ProfilUsaha/ProfilUsaha.vue')
    },
    {
      path: 'laporan/daftar-transaksi/list',
      name: 'AdminSejelabatTransaksiList',
      component: () => import('pages/member/sijelabat/Admin/Laporan/transaksi.vue')
    },
    {
      path: 'daftar-transaksi/detail/:idtr',
      name: 'AdminSejelabatTransaksiDetail',
      component: () => import('pages/member/sijelabat/Admin/Laporan/detailTransaksi.vue')
    }
  ]
}
