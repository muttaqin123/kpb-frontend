export default {
  label: 'Manajemen Alsintan',
  icon: 'compost',
  hasChild: true,
  subMenu: [
    {
      label: 'Master Alsintan',
      icon: 'app_registration',
      to: 'manajemenSaprasSuperAdmin'
    }
    // {
    //   label: 'Manajemen Kategori',
    //   icon: 'app_registration',
    //   to: 'manajemenKategoriAlsintanSuperAdmin'
    // },
    // {
    //   label: 'UPJA & Katalog',
    //   icon: 'diversity_3',
    //   to: 'manajemenUPJAAlsintanSuperAdmin'
    // }
  ]
}
