import { disbunProv } from 'src/helper/ListAkses'
export default [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    to: disbunProv.index
  },
  {
    label: 'Data KUR',
    icon: 'article',
    to: 'dataKURDisbunProv'
  },
  {
    label: 'Data E-Alokasi',
    icon: 'article',
    to: `dataEAlokasi${disbunProv.name}`
  },
  {
    label: 'Data Penebusan Puber',
    icon: 'article',
    to: `penebusanPuber${disbunProv.name}`
  },
  {
    label: 'Data Klinik Perkebunan',
    icon: 'article',
    to: `klinik${disbunProv.name}`
  },
  {
    label: 'Riwayat Data Klinik Perkebunan',
    icon: 'article',
    to: `riwayatKlinik${disbunProv.name}`
  }
]
