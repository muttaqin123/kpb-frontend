import { api } from '../../boot/axios'
import { setProfile } from '../../boot/Profile'
import { all } from '../ListAkses'
import { notif } from '../../boot/Notify'

class LoginServices {
  login (username, password) {
    const basicAuth = `Basic ${window.btoa(`${username}:${password}`)}`
    return api.post('auth/sign-in', {}, {
      headers: { Authorization: basicAuth }
    })
  }

  goToHome (data, router) {
    const access = data.member.users_login.access
    if (access) {
      const page = all.find(r => r.value === access)
      if (page) {
        setProfile(data)
        router.push({ name: page.index })
      } else {
        notif('Akses Dilarang', 'negative')
      }
    } else {
      notif('Akses Dilarang', 'negative')
    }
  }
}

export default new LoginServices()
