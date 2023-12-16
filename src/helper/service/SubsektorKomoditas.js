import { api } from '../../boot/axios'
import { createToken } from '../../boot/Token'

const getKomoditas = (idSubsektor) => {
  return api.get(`master/komoditas/${idSubsektor}`, createToken())
}

const getSubsektor = () => {
  return api.get('master/sektor', createToken())
}

export { getKomoditas, getSubsektor }
