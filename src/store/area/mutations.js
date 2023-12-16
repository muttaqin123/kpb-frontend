function updateProvinsi (state, val) {
  state.provinsi = val
}
function updateKabupaten (state, val) {
  state.kabupaten = val
}
function updateKecamatan (state, val) {
  state.kecamatan = val
}
function updateDesa (state, val) {
  state.desa = val
}

function updateListKabupaten (state, val) {
  state.listKabupaten = val
}
function updateListKecamatan (state, val) {
  state.listKecamatan = val
}
function updateListDesa (state, val) {
  state.listDesa = val
}

export {
  updateProvinsi,
  updateKabupaten,
  updateKecamatan,
  updateDesa,
  updateListKabupaten,
  updateListKecamatan,
  updateListDesa
}
