export default [
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/kios/profil-usaha',
    name: 'sijelabatProfilUsahakios',
    component: () => import('pages/member/sijelabat/roleKios/profilUsaha.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/kios/list-katalog',
    name: 'sijelabatListKatalogkios',
    component: () => import('pages/member/sijelabat/roleKios/ListKatalog/listKatalog.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/kios/transaksi',
    name: 'sijelabatTransaksikios',
    component: () => import('pages/member/sijelabat/roleKios/Transaksi/transaksi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/kios/transaksi-detail/:id',
    name: 'sijelabatDetailTransaksikios',
    component: () => import('pages/member/sijelabat/roleKios/Transaksi/detailTransaksi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/kios/relasi',
    name: 'sijelabatRelasikios',
    component: () => import('pages/member/sijelabat/roleKios/Relasi/relasi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/kios/relasi-datail/:id',
    name: 'sijelabatDetailRelasikios',
    component: () => import('pages/member/sijelabat/roleKios/Relasi/detailRelasi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/kios/pemesanan/show',
    name: 'sijelabatPemesanankios',
    component: () => import('pages/member/sijelabat/roleKios/Pemesanan/RiwayatPemesanan.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/kios/pemesanan/detail/:id',
    name: 'sijelabatDetailPemesanankios',
    component: () => import('pages/member/sijelabat/roleKios/Pemesanan/detailPemesanan.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/kios/pemesanan/tambah/pilih-penyedia',
    name: 'sijelabatTambahPemesanankios',
    component: () => import('pages/member/sijelabat/roleKios/Pemesanan/PemesananPilihPenyedia.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/kios/pemesanan/tambah/pilih-produk/:id',
    name: 'sijelabatPilihProdukPemesanankios',
    component: () => import('pages/member/sijelabat/roleKios/Pemesanan/DaftarProdukPenyedia.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/kios/pemesanan/tambah/checkout-produk/:id',
    name: 'sijelabatCheckoutProdukPemesanankios',
    component: () => import('pages/member/sijelabat/roleKios/Pemesanan/checkout.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/laporan/transaksi/kios',
    name: 'sijelabatLaporanTransaksikios',
    component: () => import('pages/member/sijelabat/roleKios/Laporan/transaksi.vue')
  }
]
