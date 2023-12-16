export default [
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/bahanbaku/profil-usaha',
    name: 'sijelabatProfilUsahaBahanBaku',
    component: () => import('pages/member/sijelabat/roleBahanBaku/profilUsaha.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/bahanbaku/list-katalog',
    name: 'sijelabatListKatalogBahanBaku',
    component: () => import('pages/member/sijelabat/roleBahanBaku/ListKatalog/listKatalog.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/bahanbaku/transaksi',
    name: 'sijelabatTransaksiBahanBaku',
    component: () => import('pages/member/sijelabat/roleBahanBaku/Transaksi/transaksi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/bahanbaku/transaksi-detail/:id',
    name: 'sijelabatDetailTransaksiBahanBaku',
    component: () => import('pages/member/sijelabat/roleBahanBaku/Transaksi/detailTransaksi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/bahanbaku/relasi',
    name: 'sijelabatRelasiBahanBaku',
    component: () => import('pages/member/sijelabat/roleBahanBaku/Relasi/relasi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/bahanbaku/relasi-datail/:id',
    name: 'sijelabatDetailRelasiBahanBaku',
    component: () => import('pages/member/sijelabat/roleBahanBaku/Relasi/detailRelasi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/sijelabat/laporan/transaksi/bahan-baku',
    name: 'sijelabatLaporanTransaksiBahanBaku',
    component: () => import('pages/member/sijelabat/roleBahanBaku/Laporan/transaksi.vue')
  }
]
