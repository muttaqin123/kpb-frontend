<template>
  <q-page padding>
    <q-card class="q-mb-md" flat>
      <q-card-section>
        Filter Data
        <div class="row q-col-gutter-x-md">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-select
              v-model="role"
              :options="roles"
              option-label="nama_role"
              option-value="id"
              label="Role"
              @update:model-value="getData"
              use-input
              @filter="filterRole"
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-input
              v-model="filter"
              label="Cari Nama / NIK"
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
      title="Ada yang gagal nih tolong diperbaiki yaa....."
      flat
      class="q-mb-md"
      :rows="dataError"
      :columns="columnsError"
      row-key="nik"
      v-if="adaError"
    >
      <template v-slot:top-right>
        <div class="q-gutter-x-sm">
          <q-btn
            label="Export"
            unelevated
            outline
            no-caps
            color="primary"
            @click="exportData()"
          />
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nik" :props="props">
            {{ props.row.nik }}
          </q-td>
          <q-td key="pesan" :props="props">
            {{ props.row.pesan }}
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-card class="q-mb-md q-pa-sm">
      <div class="column q-gutter-sm">
        <span class="text-weight-bold text-h6">Import Member</span>
        <div class="row q-gutter-sm">
          <q-btn
            label="Import KTP"
            unelevated
            no-caps
            color="primary"
            @click="dialogKTP = !dialogKTP"
          />
          <q-btn
            label="Import Member"
            unelevated
            no-caps
            color="primary"
            @click="dialog = !dialog"
          />
          <q-btn
            label="Import Kios"
            unelevated
            no-caps
            color="primary"
            @click="dialogKios = !dialogKios"
          />
          <!-- <q-btn
            label="Import E-Alokasi"
            unelevated
            no-caps
            color="primary"
            @click="dialog = !dialog"
          /> -->
          <q-space/>
           <q-btn
            label="Export Data Member"
            unelevated
            no-caps
            color="primary"
            @click="exportFile"
          />
        </div>
      </div>
    </q-card>

    <q-table
      class="my-sticky-header-column-table"
      title="Data Member"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      flat
      row-key="nama"
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
          <q-td key="nama" :props="props">
            {{ props.row.nama }}
          </q-td>
          <q-td key="jenis_kelamin" :props="props">
            {{ props.row.tanggal_daftar === null ? '-' : $parseDate(props.row.tanggal_daftar).timeStap  }}
          </q-td>
          <q-td key="area" :props="props">
            {{ parseArea(props.row) }}
          </q-td>
          <q-td key="alamat" :props="props">
            {{ props.row.alamat }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn :to="{name: 'detailDataMemberSuperAdmin', params: {id: props.row.nik}}" label="Detail" color="primary" unelevated/>
              <q-btn @click="onResetPassword(props.row)" label="Reset Password" color="primary" unelevated/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="dialogKTP" persistent v-if="dialogKTP">
      <q-card style="min-width: 450px">
        <q-form @submit="onSubmitKTP">
          <q-card-section>
            <div class="text-h6">Import KTP </div>
          </q-card-section>

          <q-card-section class="q-pt-none q-gutter-sm">
            <!-- <q-input
              v-model="tahun"
              disable
              label="Tahun"
              outlined
            /> -->
            <q-file
              outlined
              v-model="fileImport"
              label="Import File Excel"
              accept=".xlsx"
              :rules="[
                val => val || 'Mohon Pilih'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Batal" v-close-popup />
            <q-btn color="primary" label="Import Data" type="submit"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog" persistent v-if="dialog">
      <q-card style="min-width: 450px">
        <q-form @submit="onSubmitMember">
          <q-card-section>
            <div class="text-h6">Import Member </div>
          </q-card-section>

          <q-card-section class="q-pt-none q-gutter-sm">
            <!-- <q-input
              v-model="tahun"
              disable
              label="Tahun"
              outlined
            /> -->
            <q-file
              outlined
              v-model="fileImport"
              label="Import File Excel"
              accept=".xlsx"
              :rules="[
                val => val || 'Mohon Pilih'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Batal" v-close-popup />
            <q-btn color="primary" label="Import Data" type="submit"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogKios" persistent v-if="dialogKios">
      <q-card style="min-width: 450px">
        <q-form @submit="onSubmitKios">
          <q-card-section>
            <div class="text-h6">Import Kios </div>
          </q-card-section>

          <q-card-section class="q-pt-none q-gutter-sm">
            <!-- <q-input
              v-model="tahun"
              disable
              label="Tahun"
              outlined
            /> -->
            <q-file
              outlined
              v-model="fileImport"
              label="Import File Excel"
              accept=".xlsx"
              :rules="[
                val => val || 'Mohon Pilih'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Batal" v-close-popup />
            <q-btn color="primary" label="Import Data" type="submit"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-primary text-center" style="width: 300px">

        <q-card-section>
          <div class="text-center q-pa-md column">
            <div class="col-12 text-center">
              <q-icon :name="this.dialogpersistent.success ? 'check_circle' : 'cancel'" :color="this.dialogpersistent.success ? 'positive' : 'negative'" size="100px"/>
              <div class="q-mt-md text-h6">{{ this.dialogpersistent.message }}</div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import parseArea from '../../../helper/ParseArea'
import exportCsv from '../../../helper/ExportFile'
let roles = []
export default {
  data () {
    return {
      rows: [],
      dataError: [],
      columns: [
        { name: 'nik', align: 'left', label: 'NIK', field: 'nik' },
        { name: 'nama', align: 'left', label: 'Nama Member', field: 'nama' },
        { name: 'jenis_kelamin', align: 'left', label: 'Tanggal Daftar', field: 'jenis_kelamin' },
        { name: 'area', align: 'left', label: 'Area', field: 'area' },
        { name: 'alamat', align: 'left', label: 'Alamat', field: 'alamat' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      fileImport: null,
      loading: false,
      filter: '',
      roles: roles,
      role: null,
      adaError: false,
      persistent: false,
      dialog: false,
      dialogKTP: false,
      dialogKios: false,
      dialogpersistent: {
        message: '',
        success: false,
        detail: ''
      },
      pagination: {
        sortBy: 'nik',
        descending: false,
        page: 1,
        rowsPerPage: 50,
        rowsNumber: 0
      }
    }
  },
  created () {
    this.$resetArea()
    this.getData()
    this.getRole()
  },
  methods: {
    parseArea,
    getData () {
      this.onRequest({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    async exportFile () {
      // this.$showLoading()
      // const allData = []
      // let currentPage = 1
      // const totalPages = 1
      // const pagination = {
      //   sortBy: 'nik',
      //   descending: false,
      //   page: currentPage,
      //   rowsPerPage: 100,
      //   rowsNumber: totalPages
      // }
      // const params = {
      //   role: this.role ? this.role.id_role : '',
      //   prov: this.$store.state.area.provinsi ? this.$store.state.area.provinsi.nama : '',
      //   kab: this.$store.state.area.kabupaten ? this.$store.state.area.kabupaten.name : '',
      //   kec: this.$store.state.area.kecamatan ? this.$store.state.area.kecamatan.name : '',
      //   desa: this.$store.state.area.desa ? this.$store.state.area.desa.name : ''
      // }
      // while (currentPage <= totalPages) {
      //   console.log(currentPage)
      //   const props = {}
      //   pagination.page = currentPage
      //   props.pagination = pagination
      //   console.log(props)
      //   await this.$axios.get('users/member-aktif', this.$createPaginate(props, params))
      //     .then(res => {
      //       allData.push(...res.data.result)
      //       currentPage++
      //     })
      // }
      // this.$hide()
      // console.log(allData)
      const header = ['NIK', 'Nama Member', 'Tanggal Daftar', 'Area', 'Alamat']
      const data = this.rows.map(row => [
        `${row.nik}`,
        `${row.nama}`,
        row.tanggal_daftar === null ? '-' : this.$parseDate(row.tanggal_daftar).timeStap,
        `${row.provinsi ?? ''} - ${row.kabupaten} - ${row.kecamatan} - ${row.desa}`,
        `${row.alamat}`
      ])

      const headerRow = header.join(';')
      const dataRows = data.map(row => row.join(';'))

      const csvData = [headerRow, ...dataRows].join('\n')

      this.$exportToCsv('DataMember.csv', csvData)
    },
    onRequest (props) {
      this.loading = true
      const params = {
        role: this.role ? this.role.id_role : '',
        prov: this.$store.state.area.provinsi ? this.$store.state.area.provinsi.nama : '',
        kab: this.$store.state.area.kabupaten ? this.$store.state.area.kabupaten.name : '',
        kec: this.$store.state.area.kecamatan ? this.$store.state.area.kecamatan.name : '',
        desa: this.$store.state.area.desa ? this.$store.state.area.desa.name : ''
      }
      this.$axios.get('users/member-aktif', this.$createPaginate(props, params))
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
            this.pagination = res.data.paginate
          } else {
            this.rows = []
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getRole () {
      this.$showLoading()
      this.$axios.get('master/get-role', this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            roles = res.data.result
          }
        })
    },
    filterRole (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.roles = roles.filter(
          (v) => v.nama_role.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    onResetPassword (data) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: `Apakah anda ingin mereset password ${data.nama}`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
        this.$showLoading()
        this.$axios.put(`users/reset-password/${data.nik}`, {}, this.$createToken())
          .finally(() => this.$hide())
          .then((res) => {
            // console.log(res)
            if (res.data.status) {
              this.$notif(res.data.message, 'positive')
            }
            this.getData()
          })
          .catch(() => this.$commonErrorNotif())
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    },
    onSubmitMember () {
      this.$showLoading()
      // console.log('member')
      this.dataError = []
      this.adaError = false
      const formData = new FormData()
      formData.append('fileExcel', this.fileImport)

      this.$axios.post('check/addMember', formData, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.persistent = true
          this.dialog = false
          if (res.data.success) {
            this.fileImport = null
            this.dialogpersistent.success = true
            this.dialogpersistent.message = res.data.message
            if (res.data.dataError.length > 0) {
              this.adaError = true
              this.dataError = res.data.dataError
            }
          } else {
            this.dialogpersistent.success = false
            this.dialogpersistent.message = res.data.message
            if (res.data.dataError) {
              this.adaError = true
              this.dataError = res.data.dataError
            }
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmitKios () {
      this.$showLoading()
      // console.log('kios')
      this.dataError = []
      this.adaError = false
      const formData = new FormData()
      formData.append('fileExcel', this.fileImport)

      this.$axios.post('check/addKios', formData, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.persistent = true
          this.dialogKios = false
          if (res.data.success) {
            this.fileImport = null
            this.dialogpersistent.message = res.data.message
            this.dialogpersistent.success = true
            if (res.data.dataError.length > 0) {
              this.adaError = true
              this.dataError = res.data.dataError
            }
          } else {
            this.dialogpersistent.message = res.data.message
            this.dialogpersistent.success = false
            if (res.data.dataError) {
              this.adaError = true
              this.dataError = res.data.dataError
            }
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmitKTP () {
      this.$showLoading()
      this.dataError = []
      this.adaError = false
      const formData = new FormData()
      formData.append('fileExcel', this.fileImport)

      this.$axios.post('check/addKTP', formData, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.persistent = true
          this.dialogKTP = false
          if (res.data.success) {
            this.fileImport = null
            this.dialogpersistent.success = true
            this.dialogpersistent.message = 'Berhasil Selesai'
            if (res.data.dataError.length > 0) {
              this.adaError = true
              this.dataError = res.data.dataError
            }
          } else {
            this.dialogpersistent.success = false
            this.dialogpersistent.message = 'Gagal Selesai'
            if (res.data.dataError.length > 0) {
              this.adaError = true
              this.dataError = res.data.dataError
            }
          }
          // if (this.$parseResponse(res.data)) {
          //   this.fileImport = null
          //   this.dialog = false
          //   if (res.data.nikError) {
          //     this.adaError = true
          //     this.dataError = res.data.result.dataError
          //   }
          //   this.getData()
          // }
        }).catch(() => this.$commonErrorNotif())
    },
    exportData () {
      const content = [
        'NIK;Pesan'
      ].concat(
        this.dataError.map(row => {
          return `'${row.nik};${row.pesan}`
        })
      ).join('\r\n')

      exportCsv('data-error', content)
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
    background: #fff
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
