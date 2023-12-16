export default {
  label: 'Beasiswa',
  icon: 'home_work',
  hasChild: true,
  subMenu: [
    {
      label: 'Universitas',
      icon: 'chevron_right',
      to: 'datauniversitasAdmin'
    },
    {
      label: 'Beasiswa',
      icon: 'chevron_right',
      to: 'databeasiswaAdmin'
    },
    {
      label: 'Pengajuan',
      icon: 'chevron_right',
      to: 'dataPengajuanAdmin'
    },
    {
      label: 'Penerima Beasiswa',
      icon: 'chevron_right',
      to: 'dataPenerimaAdmin'
    }
  ]
}
