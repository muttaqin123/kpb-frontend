export default [
  {
    path: '/sapras',
    name: 'manajemenSaprasSuperAdmin',
    component: () => import('pages/superadmin/sapras/Index.vue')
  },
  {
    path: '/sapras/penyedia',
    name: 'manajemenPenyediaSaprasSuperAdmin',
    component: () => import('pages/superadmin/sapras/Penyedia.vue')
  }
]
