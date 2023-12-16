import { institusi } from '../../helper/ListAkses'
export default [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    to: institusi.index
  },
  {
    label: 'Data Diri Institusi Pendidikan',
    icon: 'book',
    to: 'datadiriInstitusi'
  },
  {
    label: 'Data Beasiswa Institusi Pendidikan',
    icon: 'book',
    to: 'dataBeasiswaInstitusi'
  },
  {
    label: 'Data Pengajuan Mahasiswa',
    icon: 'book',
    to: 'dataPengajuanInstitut'
  }
]
