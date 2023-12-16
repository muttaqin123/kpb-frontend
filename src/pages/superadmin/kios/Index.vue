// Index poktan
<template>
  <q-page padding>
    <q-card class="q-mb-md" flat>
      <q-card-section>
        Filter Data
        <div class="row q-col-gutter-x-md">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-input
              v-model="filter"
              label="Cari Nama KIOS / NIK"
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <area-provinsi withAction :action="getData"/>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <area-kabupaten withAction :action="getData"/>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <area-kecamatan withAction :action="getData"/>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <area-desa withAction :action="getData"/>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-table
      class="my-sticky-header-column-table"
      title="Data Kios"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      flat
      row-key="nik_poktan"
      :loading="loading"
      @request="onRequest"
      :pagination="pagination"
      v-model:pagination="pagination"
    >
      <!-- <template v-slot:top-right>
        <q-btn
          label="Tambah Role"
          unelevated
          color="primary"
          @click="openDialog(false, null)"
        />
      </template> -->
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nik" :props="props">
            {{ props.row.nik }}
          </q-td>
          <q-td key="nama_kios" :props="props">
            {{ props.row.nama_kios }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Lihat Daftar Poktan" no-caps @click="this.$router.push({name: 'detailKiosSuperAdmin', params: {nik: props.row.kode_kios, nama: props.row.nama_kios} })" color="positive" unelevated/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<script>
import parseArea from '../../../helper/ParseArea'
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nik', align: 'left', label: 'NIK', field: 'nik' },
        { name: 'nama_kios', align: 'left', label: 'Nama Kios', field: 'nama_kios' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      filter: '',
      persistent: false,
      dataPopup: {
        data: [],
        isEdit: false
      },
      pagination: {
        sortBy: 'nik_poktan',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      }
    }
  },
  created () {
    this.$resetArea()
    this.getData()
  },
  methods: {
    parseArea,
    getData () {
      this.onRequest({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    popup (isEdit, data) {
      this.dataPopup.data = data
      this.dataPopup.isEdit = isEdit
      this.persistent = true
    },
    reset () {
      this.dataPopup.data = []
      this.dataPopup.isEdit = false
      this.persistent = false
    },
    updateProfile () {
      this.$showLoading()
      this.$axios.put('/master/update-poktan', {
        data: this.dataPopup.data
      }).finally(() => { this.$hide() })
        .then((res) => {
          this.$hide()
          // console.log(res)
          if (res.status) {
            this.$notif(res.message, 'positive')
            this.reset()
            this.getData()
          } else {
            this.$notif(res.message, 'negative')
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onRequest (props) {
      this.loading = true
      const params = {
        prov: this.$store.state.area.provinsi ? this.$store.state.area.provinsi.id : '',
        kab: this.$store.state.area.kabupaten ? this.$store.state.area.kabupaten.id : '',
        kec: this.$store.state.area.kecamatan ? this.$store.state.area.kecamatan.id : '',
        desa: this.$store.state.area.desa ? this.$store.state.area.desa.id : ''
      }
      this.$axios.get('/master/data-kios', this.$createPaginate(props, params))
        .finally(() => { this.loading = false })
        .then(res => {
          // console.log(res)
          this.rows = res.data.result
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
            this.pagination = res.data.paginate
          } else {
            this.rows = []
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>

<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  height: 500px

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 100%

  td:first-child
    /* bg color is important for td; just specify one */

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    left: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
