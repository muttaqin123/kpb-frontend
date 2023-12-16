import { tphProv } from '../../../helper/ListAkses'
export default [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    to: tphProv.index
  },
  {
    label: 'Data KUR',
    icon: 'article',
    to: `dataKUR${tphProv.name}`
  },
  {
    label: 'Data E-Alokasi',
    icon: 'article',
    to: `dataEAlokasi${tphProv.name}`
  },
  {
    label: 'Data Penebusan Puber',
    icon: 'article',
    to: `penebusanPuber${tphProv.name}`
  }
]
