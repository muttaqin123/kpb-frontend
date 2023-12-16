export default [
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/distributor/profil-usaha',
    name: 'sijelabatProfilUsahadistributor',
    component: () => import('pages/member/sijelabat/roleDistributor/profilUsaha.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/distributor/list-katalog',
    name: 'sijelabatListKatalogdistributor',
    component: () => import('pages/member/sijelabat/roleDistributor/ListKatalog/listKatalog.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/distributor/transaksi',
    name: 'sijelabatTransaksidistributor',
    component: () => import('pages/member/sijelabat/roleDistributor/Transaksi/transaksi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/distributor/transaksi-detail/:id',
    name: 'sijelabatDetailTransaksidistributor',
    component: () => import('pages/member/sijelabat/roleDistributor/Transaksi/detailTransaksi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/distributor/relasi',
    name: 'sijelabatRelasidistributor',
    component: () => import('pages/member/sijelabat/roleDistributor/Relasi/relasi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/distributor/relasi-datail/:id',
    name: 'sijelabatDetailRelasidistributor',
    component: () => import('pages/member/sijelabat/roleDistributor/Relasi/detailRelasi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/distributor/pemesanan/show',
    name: 'sijelabatPemesanandistributor',
    component: () => import('pages/member/sijelabat/roleDistributor/Pemesanan/RiwayatPemesanan.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/distributor/pemesanan/detail/:id',
    name: 'sijelabatDetailPemesanandistributor',
    component: () => import('pages/member/sijelabat/roleDistributor/Pemesanan/detailPemesanan.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/distributor/pemesanan/tambah/pilih-penyedia',
    name: 'sijelabatTambahPemesanandistributor',
    component: () => import('pages/member/sijelabat/roledistributor/Pemesanan/PemesananPilihPenyedia.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/distributor/pemesanan/tambah/pilih-produk/:id',
    name: 'sijelabatPilihProdukPemesanandistributor',
    component: () => import('pages/member/sijelabat/roledistributor/Pemesanan/DaftarProdukPenyedia.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/distributor/pemesanan/tambah/checkout-produk/:id',
    name: 'sijelabatCheckoutProdukPemesanandistributor',
    component: () => import('pages/member/sijelabat/roledistributor/Pemesanan/checkout.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/laporan/transaksi/distributor',
    name: 'sijelabatLaporanTransaksidistributor',
    component: () => import('pages/member/sijelabat/roleDistributor/Laporan/transaksi.vue')
  }
]
