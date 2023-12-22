const bank = {
  label: 'Bank',
  value: 'bank',
  index: 'dashboardBank'
}

const institusi = {
  label: 'Institusi',
  value: 'institusi',
  index: 'dashboardInstitusi'
}

const pabrikan = {
  label: 'Pabrikan',
  value: 'pabrik',
  index: 'dashboardPabrikan'
}

const unila = {
  label: 'Unila',
  value: 'unila',
  index: 'dashboardUnila'
}

const bppmb = {
  label: 'BPPMB',
  value: 'bppmb',
  index: 'pengajuanSertifikasiBenihBPPMB'
}

const bpjs = {
  label: 'BPJS',
  value: 'bpjs',
  index: 'dashboardBPJS'
}

const jasindo = {
  label: 'Jasindo',
  value: 'jasindo',
  index: 'dashboardJasindo'
}

const superAdmin = {
  label: 'superadmin',
  value: 'superadmin',
  index: 'dashboardSuperAdmin'
}

const member = {
  label: 'Member',
  value: 'member',
  index: 'indexRoleMember'
}

const tphProv = {
  label: 'TPH Provinsi',
  value: 'tphprovinsi',
  index: 'dashboardTPHProv',
  name: 'TPHProv',
  level: 0
}

const dpkhProv = {
  label: 'DPKH Provinsi',
  value: 'dpkhprovinsi',
  index: 'dashboardDPKHProv',
  level: 0
}

const dkpProv = {
  label: 'DKP Provinsi',
  value: 'dkpprovinsi',
  index: 'dashboardDKPProv',
  level: 0
}

const disbunProv = {
  label: 'Disbun Provinsi',
  value: 'disbunprovinsi',
  index: 'dashboardDisbunProv',
  level: 0,
  name: 'DisbunProv'
}

const dinasKehutananProv = {
  label: 'Dinas Kehutanan Provinsi',
  value: 'dinaskehutananprovinsi',
  index: 'dashboardDinasKehutananProv',
  level: 0
}

const dinasPerikananProv = {
  label: 'Dinas Perikanan Provinsi',
  value: 'dinasperikananprovinsi',
  index: 'dashboardDinasPerikananProv',
  level: 0
}

const tphKab = {
  label: 'TPH Kabupaten',
  value: 'tphkabupaten',
  index: 'dashboardTPHKab',
  level: 1,
  name: 'TPHKab'
}

const dpkhKab = {
  label: 'DPKH Kabupaten',
  value: 'dpkhkabupaten',
  index: 'dashboardDPKHKab',
  level: 1
}

const dkpKab = {
  label: 'DKP Kabupaten',
  value: 'dkpkabupaten',
  index: 'dashboardDKPKab',
  level: 1
}

const disbunKab = {
  label: 'Disbun Kabupaten',
  value: 'disbunkabupaten',
  index: 'dashboardDisbunKab',
  level: 1,
  name: 'DisbunKab'
}

const dinasKehutananKab = {
  label: 'Dinas Kehutanan Kabupaten',
  value: 'dinaskehutanankabupaten',
  index: 'dashboardDinasKehutananKab',
  level: 1
}

const brigade = {
  label: 'Brigade',
  value: 'brigade',
  index: 'dashboardBrigade'
}

const brigadeEmployed = {
  label: 'Brigade Employed',
  value: 'brigadeEmployed',
  index: 'dashboardBrigadeEmployed'
}

const bppKec = {
  label: 'BPP Kecamatan',
  value: 'tphkecamatan',
  index: 'dashboardBPPKec',
  name: 'BPPKec'
}

const agenAlsintan = {
  label: 'Agen Alsintan',
  value: 'agenalsintan',
  index: 'dashboardAgenAlsintan'
}

const okkpd = {
  label: 'OKKPD',
  value: 'okkpd',
  index: 'dashboardOKKPD'
}

const bpsb = {
  label: 'BPSB',
  value: 'bpsb',
  index: 'dashboardBPSB'
}

const opt = {
  label: 'OPT',
  value: 'opt',
  index: 'dashboardOpt'
}

const adminSijelabat = {
  label: 'Admin Sijelabat',
  value: 'adminsijelabat',
  index: 'dashboardAdminSijelabat'
}

const listDinas = [
  tphKab,
  tphProv,
  dpkhProv,
  dpkhKab,
  dkpProv,
  dkpKab,
  disbunKab,
  disbunProv,
  dinasKehutananProv,
  dinasKehutananKab,
  dinasPerikananProv,
  bppKec,
  okkpd,
  opt,
  bpsb
]

const all = [
  bank,
  superAdmin,
  member,
  bpjs,
  jasindo,
  brigade,
  brigadeEmployed,
  pabrikan,
  bppmb,
  okkpd,
  institusi,
  agenAlsintan,
  adminSijelabat,
  unila,
  ...listDinas
]

export {
  bank,
  superAdmin,
  member,
  tphKab,
  tphProv,
  dpkhProv,
  dpkhKab,
  dkpProv,
  dkpKab,
  dinasKehutananKab,
  disbunKab,
  disbunProv,
  all,
  listDinas,
  dinasKehutananProv,
  dinasPerikananProv,
  bpjs,
  jasindo,
  brigade,
  brigadeEmployed,
  pabrikan,
  bppmb,
  okkpd,
  bppKec,
  institusi,
  agenAlsintan,
  opt,
  bpsb,
  adminSijelabat,
  unila
}
