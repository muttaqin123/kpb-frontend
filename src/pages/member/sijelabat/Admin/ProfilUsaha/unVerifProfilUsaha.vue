<template>
  <q-page padding>
    <q-banner inline-actions rounded style="background-color: #050D33; color: #FFFFFF">
      <strong>Data Profil Usaha</strong>
    </q-banner>
    <br />
    <q-card flat>
      <q-card-section>
        <q-table
          class="my-sticky-column-table"
          flat
          bordered
          :rows="data"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :pagination="pagination"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body-cell-role="props">
            <q-td :props="props">
              {{props.row.layanan?.nama_layanan}}
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <div class="q-gutter-sm">
                <q-btn outline color="orange" size="sm" @click="toDetail(props.row.profil_usaha_id)" icon="view_timeline"> Detail/ Verifkasi</q-btn>
                <q-btn outline color="red" size="sm" @click="toDelete(props.row.profil_usaha_id)" icon="delete"> Hapus Data</q-btn>
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
// import { parseProfile } from '../../../../../boot/Profile'
// const profile = parseProfile()
export default {
  name: 'listKatalogLayout',
  data () {
    return {
      filter: '',
      pagination: {
        rowsPerPage: 10
      },
      columns: [
        {
          name: 'nama_usaha',
          align: 'left',
          label: 'Nama Relasi',
          field: 'nama_usaha',
          sortable: true
        },
        { name: 'role', required: true, label: 'Role', align: 'left', field: 'role', sortable: true },
        { name: 'action', required: true, label: 'Action', align: 'left', field: 'action', sortable: true }
      ],
      data: []
    }
  },
  methods: {
    getPU () {
      this.$showLoading()
      this.$axios.get('sijelabat/admin-sijelabat/profil-usaha/unverif/', this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.data = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    toDetail (idu) {
      const ids = btoa(idu)
      this.$router.push({ name: 'AdminSejelabatProfilUsahaDetail', params: { idpu: ids } })
    },
    toDelete (idu) {
      const ids = btoa(idu)
      this.$showLoading()
      this.$axios.get(`sijelabat/admin-sijelabat/profil-usaha/delete/${ids}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.getPU()
          }
        }).catch(() => this.$commonErrorNotif())
    }
  },
  created () {
    this.getPU()
  }
}
</script>

<style scoped>

</style>
