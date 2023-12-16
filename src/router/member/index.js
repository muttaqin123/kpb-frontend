import penyuluh from './penyuluh'
import distri from './distri'
import alsintanMember from './alsintanmember'
import pekebun from './pekebun'
import kios from './kios'
import poktan from './poktan'
import bantuan from './bantuan'
import beasiswa from './beasiswa'
import okkpd from './okkpd'
import petani from './petani'
import duta from './duta'
import pemasaran from './pemasaran'
import sijelabatBahanBaku from './sijelabat/bahanbaku'
import sijelabatProdusen from './sijelabat/produsen'
import sijelabatPembudiDaya from './sijelabat/pembudidaya'
import sijelabatDistributor from './sijelabat/distributor'
import sijelabatKios from './sijelabat/kios'
import sertifbenihpertanian from './sertifbenihpertanian'

export default [
  // general member
  {
    path: 'fitur/:idRole/:idLayanan',
    name: 'indexFitur',
    meta: {
      cekFitur: false
    },
    component: () => import('pages/member/Fitur.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/dashboard',
    name: 'dashboardSertifikasi',
    meta: {
      cekFitur: false
    },
    component: () => import('pages/member/dashboardSertifBenih.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/dashboardPemasaran',
    name: 'dashboardPemasaranUser',
    meta: {
      cekFitur: false
    },
    component: () => import('pages/member/dashboardPemasaran.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/dashboardOkkpd',
    name: 'dashboardOkkpd',
    meta: {
      cekFitur: false
    },
    component: () => import('pages/member/dashboardOkkpd.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/dashboardDuta',
    name: 'dashboardDuta',
    meta: {
      cekFitur: false
    },
    component: () => import('pages/member/dashboardDuta.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/dashboardSertifBenihPertanian',
    name: 'dashboardSertifBenihPertanianMember',
    meta: {
      cekFitur: false
    },
    component: () => import('pages/member/dashboardSertifBenihPertanian.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/home-sijelabat',
    name: 'indexSijelabat',
    meta: {
      cekFitur: false
    },
    component: () => import('pages/member/sijelabat/Dashboard.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/pengajuankur',
    name: 'pengajuanKURMember',
    component: () => import('pages/member/kur/PengajuanKUR.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/datapengajuan',
    name: 'dataPengajuanKURMember',
    component: () => import('pages/member/kur/DataPengajuan.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/persyaratan/:idBank',
    name: 'persyaratanBank',
    component: () => import('pages/sharedpages/kur/Persyaratan.vue')
  },
  ...penyuluh,
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/formpengajuan',
    name: 'formPengajuanAsuransiMember',
    component: () => import('pages/member/asuransi/FormAsuransi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/datapengajuanasuransi',
    name: 'dataPengajuanAsuransiMember',
    component: () => import('pages/member/asuransi/DataAsuransi.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/formpengajuanbpjs',
    name: 'formPengajuanAsuransiBPJSMember',
    component: () => import('pages/member/asuransi/bpjs/Form.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/datapengajuanbpjs',
    name: 'dataPengajuanAsuransiBPJSMember',
    component: () => import('pages/member/asuransi/bpjs/DataPengajuan.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/datapengajuanbpjs/detail/:id',
    name: 'detailDataPengajuanAsuransiBPJSMember',
    component: () => import('pages/sharedpages/asuransi/bpjs/Detail.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/asuransi/jasindo/form',
    name: 'formJasindoMember',
    component: () => import('pages/member/asuransi/jasindo/Form.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/asuransi/jasindo/pengajuan',
    name: 'dataJasindoMember',
    component: () => import('pages/member/asuransi/jasindo/Index.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/asuransi/jasindo/pengajuan/detail/:id',
    name: 'detailDataJasindoMember',
    component: () => import('pages/sharedpages/asuransi/jasindo/Detail.vue')
  },
  {
    path: 'fitur/:idRole/:idLayanan/:idFitur/katalog',
    name: 'katalogMember',
    component: () => import('pages/member/saprotan/Index.vue')
  },
  ...petani,
  ...distri,
  ...alsintanMember,
  ...kios.allRoutes,
  ...pekebun,
  ...poktan,
  ...bantuan,
  ...beasiswa.allRoutes,
  ...okkpd,
  ...duta,
  ...pemasaran,
  ...sijelabatBahanBaku,
  ...sijelabatProdusen,
  ...sijelabatPembudiDaya,
  ...sijelabatDistributor,
  ...sijelabatKios,
  ...sertifbenihpertanian
]
