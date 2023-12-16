export default {
  allRoutes: [
    {
      path: 'fitur/:idRole/:idLayanan/:idFitur/kios/saprotan',
      name: 'kelolaSaprotanKios',
      component: () => import('pages/member/kios/KelolaSaprotan.vue')
    },
    {
      path: 'fitur/:idRole/:idLayanan/:idFitur/kios/puber/penebusan',
      name: 'penebusanPuberKios',
      component: () => import('pages/member/kios/PenebusanPuber.vue')
    },
    {
      path: 'fitur/:idRole/:idLayanan/:idFitur/kios/puber/penebusan/detail/:idTransaksi',
      name: 'detailPenebusanPuberKios',
      component: () => import('pages/sharedpages/ealokasi/Detail.vue')
    },
    {
      path: 'fitur/:idRole/:idLayanan/:idFitur/kios/puber/alokasi',
      name: 'alokasiPerKios',
      component: () => import('pages/member/kios/Alokasi.vue')
    },
    {
      path: 'fitur/:idRole/:idLayanan/:idFitur/kios/puber/stok',
      name: 'manajemenStokKios',
      component: () => import('pages/member/kios/ManajemanStok.vue')
    },
    {
      path: 'fitur/:idRole/:idLayanan/:idFitur/kios/puber/profile',
      name: 'updateProfileKios',
      component: () => import('pages/member/kios/Profile.vue')
    },
    {
      path: 'fitur/:idRole/:idLayanan/:idFitur/kios/puber/f9',
      name: 'laporanF9Kios',
      component: () => import('pages/member/kios/F9.vue')
    },
    {
      path: 'fitur/:idRole/:idLayanan/:idFitur/kios/puber/f6',
      name: 'laporanF6Kios',
      component: () => import('pages/member/kios/F6.vue')
    }
  ],
  cetakRoutes: {
    path: '/member/',
    component: () => import('layouts/PrintLayout.vue'),
    meta: {
      auth: true,
      // adaMenu: true,
      cekAkses: true,
      cekFitur: true,
      member: true
    },
    children: [
      {
        path: 'fitur/:idRole/:idLayanan/:idFitur/kios/puber/nota/:idTransaksi',
        name: 'notaPuberKios',
        component: () => import('pages/sharedpages/ealokasi/Invoices.vue')
      },
      {
        path: 'fitur/:idRole/:idLayanan/:idFitur/kios/puber/cetak/f9/:tahun/:bulan',
        name: 'cetakF9Kios',
        component: () => import('pages/member/kios/CetakF9.vue')
      },
      {
        path: 'fitur/:idRole/:idLayanan/:idFitur/kios/puber/f6/cetak/:tahun/:bulan/:idKios/:idDistri',
        name: 'cetakF6Kios',
        component: () => import('pages/sharedpages/ealokasi/F6Kios.vue')
      }
    ]
  }
}
