import { opt } from '../../../helper/ListAkses'
export default [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    to: opt.index
  },
  {
    label: 'Petugas POPT',
    icon: 'medication',
    to: 'dataDokterOpt'
  },
  {
    label: 'Pengaduan OPT',
    icon: 'summarize',
    to: 'dataPengaduanOPTPetaniOpt'
  },
  {
    label: 'Pengaduan DPI',
    icon: 'thunderstorm',
    to: 'dataPengaduanSPIPetaniOpt'
  },
  {
    label: 'Permohonan APH',
    icon: 'edit_note',
    to: 'dataPermohonanAPHPetaniOpt'
  },
  {
    label: 'Permohonan Bimtek',
    icon: 'local_library',
    to: 'dataPermohonanBimtekPetaniOpt'
  },
  {
    label: 'Berita',
    icon: 'newspaper',
    to: 'indexBeritaOpt'
  },
  {
    label: 'Kategori Berita',
    icon: 'category',
    to: 'kategoriBeritaOpt'
  },
  {
    label: 'Master APH',
    icon: 'fact_check',
    to: 'masterAPHPetaniOpt'
  }
]
