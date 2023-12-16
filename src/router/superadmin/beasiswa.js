export default {
  allRoutes: [
    {
      path: 'databeasiswa',
      name: 'databeasiswaAdmin',
      component: () => import('src/pages/superadmin/beasiswa/Beasiswa/Index.vue')
    },
    {
      path: 'detailbeasiswa/:id',
      name: 'detailbeasiswaAdmin',
      component: () => import('src/pages/sharedpages/beasiswa/DetailPage.vue')
    },
    {
      path: 'datauniversitas',
      name: 'datauniversitasAdmin',
      component: () => import('src/pages/superadmin/beasiswa/Universitas/Index.vue')
    },
    {
      path: 'dataPengajuanAdmin',
      name: 'dataPengajuanAdmin',
      component: () => import('src/pages/superadmin/beasiswa/Pengajuan/Index.vue')
    },
    {
      path: 'detailPengajuanAdmin/:id',
      name: 'detailPengajuanAdmin',
      component: () => import('src/pages/sharedpages/beasiswa/DetailPengajuan.vue')
    },
    {
      path: 'dataPenerimaAdmin',
      name: 'dataPenerimaAdmin',
      component: () => import('src/pages/superadmin/beasiswa/Pengajuan/DataPenerima.vue')
    }
  ],
  cetakRoutes: {
    path: '/super-admin',
    component: () => import('layouts/PrintLayout.vue'),
    meta: {
      adaMenu: true,
      auth: true,
      admin: true
    },
    children: [
      {
        path: 'cetakPengajuanBeasiswa/:id',
        name: 'cetakPengajuanBeasiswa',
        component: () => import('src/pages/sharedpages/beasiswa/PrintPage.vue')
      }
    ]
  }
}
