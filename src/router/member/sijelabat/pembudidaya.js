export default [
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/pembudi-daya/pemesanan/list-produk',
    name: 'sijelabatListProdukPembudidaya',
    component: () => import('pages/member/sijelabat/rolePembudidayaIkan/Pemesanan/ListProduk.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/pembudi-daya/pemesanan/list-produk/detail/:idmm/:idprofilusaha',
    name: 'sijelabatDetailListProdukPembudidaya',
    component: () => import('pages/member/sijelabat/rolePembudidayaIkan/Pemesanan/DetailProduk.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/pembudi-daya/pemesanan/list-produk/checkout/',
    name: 'sijelabatCheckoutListProdukPembudidaya',
    component: () => import('pages/member/sijelabat/rolePembudidayaIkan/Pemesanan/checkout.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/pembudi-daya/riwayat-pemesanan/',
    name: 'sijelabatRiwayatPemesananPembudidaya',
    component: () => import('pages/member/sijelabat/rolePembudidayaIkan/RiwayatPemesanan/RiwayatPemesanan.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/pembudi-daya/riwayat-pemesanan/detail/:id',
    name: 'sijelabatDetailRiwayatPemesananPembudidaya',
    component: () => import('pages/member/sijelabat/rolePembudidayaIkan/RiwayatPemesanan/detailPemesanan.vue')
  }
]
