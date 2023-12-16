export default [
  {
    path: '/alsintan/kategori',
    name: 'manajemenKategoriAlsintanSuperAdmin',
    component: () => import('pages/superadmin/alsintan/Kategori.vue')
  },
  {
    path: '/alsintan/upja',
    name: 'manajemenUPJAAlsintanSuperAdmin',
    component: () => import('pages/superadmin/alsintan/UPJA.vue')
  },
  {
    path: '/alsintan/upja/katalog/:id',
    name: 'manajemenUPJAKatalogAlsintanSuperAdmin',
    component: () => import('pages/superadmin/alsintan/UPJAKatalog.vue')
  },
  {
    path: '/alsintan/upja/katalog/detailproduk/:id',
    name: 'manajemenDetailProdukAlsintanSuperAdmin',
    component: () => import('pages/superadmin/alsintan/DetailProduk.vue')
  }
]
