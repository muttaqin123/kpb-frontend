export default {
  allRoutes: [
    {
      path: 'fitur/:idRole/:idLayanan/:idFitur/beasiswa/',
      name: 'dashboardBeasiswa',
      component: () => import('pages/member/beasiswa/IndexPage.vue')
    },
    {
      path: 'fitur/:idRole/:idLayanan/:idFitur/beasiswa/detail/:id',
      name: 'detailBeasiswa',
      component: () => import('src/pages/sharedpages/beasiswa/DetailPage.vue')
    },
    {
      path: 'fitur/:idRole/:idLayanan/:idFitur/beasiswa/daftarPengajuan',
      name: 'dataPengajuanBeasiswa',
      component: () => import('src/pages/member/beasiswa/DataPengajuan.vue')
    },
    {
      path: 'fitur/:idRole/:idLayanan/:idFitur/beasiswa/detailPengajuan/:id',
      name: 'detailPengajuanBeasiswa',
      component: () => import('src/pages/sharedpages/beasiswa/DetailPengajuan.vue')
    }
  ]
}
