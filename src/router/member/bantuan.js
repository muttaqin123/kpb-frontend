export default [
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/bantuan/',
    name: 'dashboardBantuan',
    component: () => import('pages/member/bantuan/IndexPage.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/bantuan/detail/:id',
    name: 'detailBantuan',
    component: () => import('pages/member/bantuan/DetailPage.vue')
  }
]
