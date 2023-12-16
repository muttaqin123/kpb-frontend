<template>
  <q-page padding>
    <q-card class="q-mb-md" flat>
      <q-card-section>
        Filter Data
        <div class="row q-col-gutter-x-md">
          <!-- <div class="col-md-4 col-sm-6 col-xs-12">
            <q-input
              v-model="filter"
              label="Cari Nama / NIK"
            />
          </div> -->
          <!-- <div class="col-md-4 col-sm-6 col-xs-12">
            <area-provinsi/>
          </div> -->
          <div class="col-md-4 col-sm-6 col-xs-12">
            <area-kabupaten
              :auto-load="!kab"
              withAction
              :action="getData"
              :readonly="kab"
              :kec="$getProfile()?.member?.reg_regencies"
              loadKec
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <area-kecamatan
              :action="getData"
              withAction
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <area-desa
              :action="getData"
              withAction
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-select
                :options="listSubsektor"
                v-model="subsektor"
                label="Subsektor"
                option-label="sektor"
                option-value="id"
                @update:model-value="getKomoditas()"
                :rules="[
                  val => val || 'Mohon Pilih'
                ]"
              />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-select
                :options="listKomoditas"
                v-model="komoditas"
                label="Komoditas"
                option-label="komoditas"
                option-value="id"
                @update:model-value="getData()"
                :rules="[
                  val => val || 'Mohon Pilih'
                ]"
              />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-select
              :options="[1, 2, 3]"
              v-model="mt"
              @update:model-value="getData()"
              label="Masa Tanam/Usia Tanam"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-table
      title="Error........"
      flat
      class="q-mb-md"
      :rows="dataError"
      :columns="columnsError"
      row-key="nik"
      v-if="errorDelete"
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
          <q-td key="reason" :props="props">
            {{ props.row.status }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table
      title="Data NIK Tidak Terdaftar Di tabel member kami, mohon diinput ya....."
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
          <q-td key="reason" :props="props">
            {{ props.row.keterangan }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table
      title="Data E-Alokasi"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
      row-key="alokasi_id"
      :filter="filter"
      v-model:selected="selected"
      selection="multiple"
      @request="onRequest"
      v-model:pagination="pagination"
    >
      <template v-slot:top-right>
        <div class="q-gutter-x-sm">
          <q-btn
            label="Download Template Excel"
            unelevated
            outline
            no-caps
            color="primary"
            @click="dialog = !dialog"
          />
          <q-btn
            label="Import E-Alokasi"
            unelevated
            no-caps
            color="primary"
            @click="dialog = !dialog"
          />
          <q-btn
            v-if="selected.length > 0"
            label="Hapus Yang Ditandai"
            unelevated
            color="red-10"
            @click="this.confirm = true"
          />
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            <q-checkbox dense v-model="props.selected"/>
          </q-td>
          <q-td key="penyuluh" :props="props">
            {{ props.row.nama_penyuluh }}
          </q-td>
          <q-td key="nik" :props="props">
            {{ props.row.nik_petani }}
          </q-td>
          <q-td key="nama_lengkap" :props="props">
            {{ props.row.nama_petani }}
          </q-td>
          <q-td key="area" :props="props">
            {{ `${props.row.kabupaten_petani ?? ''} - ${props.row.kecamatan_petani ?? ''} - ${props.row.desa_petani ?? ''}` }}
          </q-td>
          <q-td key="komoditas" :props="props">
            {{ props.row.komoditas }}
          </q-td>
          <q-td key="mt" :props="props">
            {{ props.row.masatanam }}
          </q-td>
          <q-td key="tahun" :props="props">
            {{ props.row.tahun }}
          </q-td>
          <q-td key="luasLahan" :props="props">
            {{ props.row.luaslahan }}
          </q-td>
          <q-td key="kios" :props="props">
            {{ props.row.nama_kios }}
          </q-td>
          <q-td key="poktan" :props="props">
            {{ props.row.nama_poktan }}
          </q-td>
          <q-td key="urea" :props="props">
            {{ props.row.urea }}
          </q-td>
          <q-td key="npk" :props="props">
            {{ props.row.npk }}
          </q-td>
          <q-td key="npkfk" :props="props">
            {{ props.row.npkfk }}
          </q-td>
          <!-- <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="-" outline color="dark" unelevated/>
            </div>
          </q-td> -->
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="dialog" persistent v-if="dialog">
      <q-card style="min-width: 450px">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">Import E-Alokasi</div>
          </q-card-section>

          <q-card-section class="q-pt-none q-gutter-sm">
            <!-- <q-input
              v-model="tahun"
              disable
              label="Tahun"
              outlined
            /> -->
            <q-select
              :options="listSubsektor"
              v-model="subsektor"
              label="Subsektor"
              option-label="sektor"
              option-value="id"
              :rules="[
                val => val || 'Mohon Pilih'
              ]"
            />
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
    <q-dialog v-model="alert" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-primary text-center" style="width: 300px">

        <q-card-section>
          <div class="text-center q-pa-md column">
            <div class="col-12 text-center">
              <q-icon :name="this.alertData.status ? 'check_circle' : 'cancel'" :color="this.alertData.status ? 'positive' : 'negative'" size="100px"/>
              <div class="q-mt-md text-h6">{{ this.alertData.message }}</div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center q-ma-sm">
          <q-avatar icon="delete" color="negative" text-color="white" />
          <span class="q-ml-md">Apakah Anda yakin Menghapus {{ this.selected.length }} Alokasi ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="OK" color="primary" @click="deleteAlokasi" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { getSubsektor } from 'src/helper/service/SubsektorKomoditas'
import exportCsv from 'src/helper/ExportFile'
import * as helper from 'src/helper/service/SubsektorKomoditas'
export default {
  props: {
    canImport: {
      type: Boolean,
      default: false
    },
    canDelete: {
      type: Boolean,
      default: false
    },
    kab: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selected: [],
      rows: [],
      dataError: [],
      columnsError: [
        { name: 'nik', align: 'left', label: 'NIK', field: 'nik' },
        { name: 'reason', align: 'left', label: 'Keterangan', field: 'reason' }
      ],
      columns: [
        { name: 'penyuluh', align: 'left', label: 'Penyuluh', field: 'penyuluh' },
        { name: 'nik', align: 'left', label: 'NIK', field: 'nik' },
        { name: 'nama_lengkap', align: 'left', label: 'Nama Lengkap', field: 'nama_lengkap' },
        { name: 'area', align: 'left', label: 'Area', field: 'area' },
        { name: 'komoditas', align: 'left', label: 'Komoditas', field: 'komoditas' },
        { name: 'mt', align: 'left', label: 'Masa Tanam', field: 'mt' },
        { name: 'tahun', align: 'left', label: 'Tahun', field: 'tahun' },
        { name: 'luasLahan', align: 'left', label: 'Luas Lahan (Ha)', field: 'luasLahan' },
        { name: 'kios', align: 'left', label: 'Kios', field: 'kios' },
        { name: 'poktan', align: 'left', label: 'Poktan', field: 'poktan' },
        { name: 'urea', align: 'left', label: 'Urea (Kg)', field: 'urea' },
        { name: 'npk', align: 'left', label: 'NPK (Kg)', field: 'npk' },
        { name: 'npkfk', align: 'left', label: 'NPKFK (Kg)', field: 'npkfk' }
        // { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      confirm: false,
      activeData: null,
      activeStatus: null,
      fileImport: null,
      filter: '',
      alert: false,
      alertData: {
        success: false,
        message: ''
      },
      listSubsektor: [],
      subsektor: null,
      adaError: false,
      errorDelete: false,
      pagination: {
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      listKomoditas: [],
      komoditas: null,
      mt: null
    }
  },
  async created () {
    this.$resetArea()
    if (this.kab) {
      this.$store.commit('area/updateKabupaten', this.$getProfile()?.member?.reg_regencies)
    }
    this.getData()
    this.getSektor()
  },
  methods: {
    deleteAlokasi () {
      this.dataError = []
      this.errorDelete = false
      this.$showLoading()
      this.$axios.delete('alokasi/delete_alokasi', {
        data: this.selected
      }).finally(() => {
        this.confirm = false
        this.$hide()
      }).then((res) => {
        this.selected = []
        if (res.data.nikError) {
          this.errorDelete = true
          this.dataError = res.data.result.dataError
        }
        this.getData()
        this.$notif(res.data.message, 'positive')
      }).catch(() => this.$commonErrorNotif())
    },
    getSektor () {
      getSubsektor()
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.listSubsektor = res.data.result
          }
        })
    },
    getData () {
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
    },
    onRequest (props) {
      this.loading = true
      const params = {
        kab: this.$store.state.area.kabupaten ? this.$store.state.area.kabupaten.name : '',
        kec: this.$store.state.area.kecamatan ? this.$store.state.area.kecamatan.name : '',
        desa: this.$store.state.area.desa ? this.$store.state.area.desa.name : '',
        sektor: this.subsektor ? this.subsektor.sektor : '',
        komoditas: this.komoditas ? this.komoditas.komoditas : '',
        masatanam: this.mt
      }
      this.$axios.get('alokasi/data', this.$createPaginate(props, params))
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
            this.pagination = res.data.paginate
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      this.$showLoading()
      this.dataError = []
      this.adaError = false
      const formData = new FormData()
      formData.append('fileExcel', this.fileImport)
      formData.append('id_sektor', this.subsektor.id)

      this.$axios.post('alokasi/import-alokasi', formData, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.alert = true
            this.alertData = res.data
            this.fileImport = null
            this.dialog = false
            if (res.data.nikError) {
              this.adaError = true
              this.dataError = res.data.result.dataError
            }
            this.getData()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    openDialog () {
      this.$showLoading()
      // this.$axios.put(`kur/acc/${data.id}`, body, this.$createToken())
      //   .finally(() => this.$hide())
      //   .then(res => {
      //     if (this.$parseResponse(res.data)) {
      //       this.getData()
      //     }
      //   }).catch(() => this.$commonErrorNotif())
    },
    async getKomoditas () {
      this.komoditas = null
      await helper.getKomoditas(this.subsektor.id)
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.listKomoditas = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
      // this.getData()
    },
    exportData () {
      const content = [
        'NIK;Keterangan'
      ].concat(
        this.dataError.map(row => {
          return `'${row.nik};${row.keterangan}`
        })
      ).join('\r\n')

      exportCsv('data-error', content)
    }
  }
}
</script>
