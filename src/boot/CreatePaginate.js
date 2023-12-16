import { boot } from 'quasar/wrappers'
import { createToken } from './Token'

export default boot(async ({ app }) => {
  app.config.globalProperties.$createPaginate = (propsPaginate, param = {}, id = null) => {
    const { page, rowsPerPage, rowsNumber } = propsPaginate.pagination

    const filter = propsPaginate.filter
    const params = {
      page: Number(page),
      filter: filter,
      perpage: rowsPerPage === 0 ? rowsNumber : rowsPerPage,
      id: id,
      ...param
    }
    return createToken(params)
  }
})
