import { api } from '../boot/axios'
import { createToken } from '../boot/Token'

const cekRole = (idMember, idRole) => {
  return api.get(`users/cek-roles/${idMember}/${idRole}`, createToken())
}

const cekLayanan = (idRole, idLayanan) => {
  return api.get(`users/cek-layanan/${idRole}/${idLayanan}`, createToken())
}

const cekFitur = (idLayanan, idFitur) => {
  return api.get(`users/cek-fitur/${idLayanan}/${idFitur}`, createToken())
}

export {
  cekRole,
  cekLayanan,
  cekFitur
}
