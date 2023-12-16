export default [
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/produsen/profil-usaha',
    name: 'sijelabatProfilUsahaprodusen',
    component: () => import('pages/member/sijelabat/roleProdusen/profilUsaha.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/produsen/list-katalog',
    name: 'sijelabatListKatalogprodusen',
    component: () => import('pages/member/sijelabat/roleProdusen/ListKatalog/listKatalog.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/produsen/transaksi',
    name: 'sijelabatTransaksiprodusen',
    component: () => import('pages/member/sijelabat/roleProdusen/Transaksi/transaksi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/produsen/transaksi-detail/:id',
    name: 'sijelabatDetailTransaksiprodusen',
    component: () => import('pages/member/sijelabat/roleProdusen/Transaksi/detailTransaksi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/produsen/relasi',
    name: 'sijelabatRelasiprodusen',
    component: () => import('pages/member/sijelabat/roleProdusen/Relasi/relasi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/produsen/relasi-datail/:id',
    name: 'sijelabatDetailRelasiprodusen',
    component: () => import('pages/member/sijelabat/roleProdusen/Relasi/detailRelasi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/produsen/pemesanan/show',
    name: 'sijelabatPemesananprodusen',
    component: () => import('pages/member/sijelabat/roleProdusen/Pemesanan/RiwayatPemesanan.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/produsen/pemesanan/detail/:id',
    name: 'sijelabatDetailPemesananprodusen',
    component: () => import('pages/member/sijelabat/roleProdusen/Pemesanan/detailPemesanan.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/produsen/pemesanan/tambah/pilih-penyedia',
    name: 'sijelabatTambahPemesananprodusen',
    component: () => import('pages/member/sijelabat/roleProdusen/Pemesanan/PemesananPilihPenyedia.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/produsen/pemesanan/tambah/pilih-produk/:id',
    name: 'sijelabatPilihProdukPemesananprodusen',
    component: () => import('pages/member/sijelabat/roleProdusen/Pemesanan/DaftarProdukPenyedia.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/produsen/pemesanan/tambah/checkout-produk/:id',
    name: 'sijelabatCheckoutProdukPemesananprodusen',
    component: () => import('pages/member/sijelabat/roleProdusen/Pemesanan/checkout.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/laporan/transaksi/produsen',
    name: 'sijelabatLaporanTransaksiprodusen',
    component: () => import('pages/member/sijelabat/roleProdusen/Laporan/transaksi.vue')
  }
]
