import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { LocalStorage } from 'quasar'
import { notif } from '../boot/Notify'
import * as middleware from './middleware'
import * as listAkses from '../helper/ListAkses'

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const dataUser = LocalStorage.getItem('datauser')
    const noSession = dataUser === null || dataUser === 'undefined'
    const loginPage = 'loginPage'
    const roleMemberPage = listAkses.member.index

    const access = noSession ? null : dataUser.member.users_login.access

    if (to.matched.some(record => record.meta.auth)) {
      if (noSession) {
        next({ name: loginPage })
      } else {
        const idMember = dataUser.member.id_member
        if (to.meta.member) {
          if (access !== listAkses.member.value) {
            next({ name: loginPage })
          } else {
            if (to.meta.cekAkses) {
              if (to.meta.cekRole) {
                middleware.cekRole(idMember, to.params.idRole)
                  .then(res => {
                    if (res.data.status) {
                      next()
                    } else {
                      notif(res.data.message, 'negative')
                      next({ name: roleMemberPage })
                    }
                  })
              } else if (to.meta.cekLayanan) {
                middleware.cekLayanan(to.params.idRole, to.params.idLayanan)
                  .then(res => {
                    if (res.data.status) {
                      next()
                    } else {
                      notif(res.data.message, 'negative')
                      next({ name: roleMemberPage })
                    }
                  }).catch(() => {
                    next({ name: roleMemberPage })
                  })
              } else if (to.meta.cekFitur) {
                middleware.cekFitur(to.params.idLayanan, to.params.idFitur)
                  .then(res => {
                    if (res.data.status) {
                      next()
                    } else {
                      notif(res.data.message, 'negative')
                      next({ name: roleMemberPage })
                    }
                  }).catch(() => {
                    next({ name: roleMemberPage })
                  })
              } else {
                next()
              }
            } else {
              next()
            }
          }
        } else {
          const adaAkses = listAkses.all.find(r => {
            return r.value === to.meta.allowedRole && r.value === access
          })
          if (adaAkses) {
            next()
          } else {
            next({ name: loginPage })
          }
        }
      }
    } else {
      const adaRoutes = listAkses.all.find(r => r.value === access)
      if (adaRoutes) {
        next({
          name: adaRoutes.index
        })
      } else {
        next()
      }
    }
  })

  return Router
})
