<template>
  <q-page padding>
    <q-card class="q-mb-md" flat>
      <q-card-section>
        Filter Data
        <div class="row q-col-gutter-x-md">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <area-kabupaten
              :auto-load="!kab"
              :withAction="!kec"
              :action="getData"
              :readonly="kab"
              :kec="$getProfile()?.member?.reg_regencies"
              :loadKec="!kec"
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <area-kecamatan
              :auto-load="kec"
              :action="getData"
              :readonly="kec"
              :desa="$getProfile()?.member?.reg_districts"
              :loadDesa="kec"
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
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-input v-model="date" label="Filter Tanggal">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date" mask="YYYY-MM-DD" @update:model-value="getData()">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-table
      title="Data Penebusan Puber"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
      @request="onRequest"
      row-key="nama"
      :filter="filter"
      :pagination="pagination"
      v-model:pagination="pagination"
    >
      <template v-slot:top-right>
        <!-- <q-btn
          label="Import E-Alokasi"
          unelevated
          color="primary"
          @click="dialog = !dialog"
        /> -->
        <q-btn
          label="Export CSV"
          unelevated
          @click="exportFile()"
          color="primary"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="kodeTransaksi" :props="props">
            {{ props.row.kode_transaksi }}
          </q-td>
          <q-td key="area" :props="props">
            {{ `${props.row.provinsi ?? ''} - ${props.row.Kabupaten} - ${props.row.kecamatan} - ${props.row.desa}` }}
          </q-td>
          <q-td key="tanggal" :props="props">
            {{ $parseDate(props.row.tanggaltransaksi).timeStap }}
          </q-td>
          <q-td key="kios" :props="props">
            {{ props.row.nama_kios }}
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
          <q-td key="jumlahPetani" :props="props">
            {{ props.row.totalPetani }}
          </q-td>
          <q-td key="totalUrea" :props="props">
            {{ props.row.totalUrea }} Kg
          </q-td>
          <q-td key="totalNpk" :props="props">
            {{ props.row.totalNpk }} Kg
          </q-td>
          <q-td key="totalNpkFk" :props="props">
            {{ props.row.totalNpkFk }} Kg
          </q-td>
          <q-td key="status" :props="props">
            <q-badge outline :color="getStatus(props.row.statustransaksi).color" class="q-pa-xs" :label="getStatus(props.row.statustransaksi).label" />
          </q-td>
          <q-td key="total" :props="props">
            {{ $formatPrice(props.row.totaltransaksi) }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Detail Transaksi" :to="{ name: detailRoute, params:{ idTransaksi: props.row.transaksi_id } }" color="primary" unelevated/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<script>
import getStatus from 'src/helper/GetStatusPuber'
import * as helper from 'src/helper/service/SubsektorKomoditas'
import parseArea from 'src/helper/ParseArea'
export default {
  props: {
    kab: {
      type: Boolean,
      default: false
    },
    detailRoute: {
      type: String
    },
    kec: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      date: '',
      parseArea,
      rows: [],
      columns: [
        { name: 'kodeTransaksi', align: 'left', label: 'Kode Transaksi', field: 'kodeTransaksi' },
        { name: 'area', align: 'left', label: 'Area', field: 'area' },
        { name: 'tanggal', align: 'left', label: 'Tanggal', field: 'tanggal' },
        { name: 'kios', align: 'left', label: 'Kios', field: 'kios' },
        { name: 'komoditas', align: 'left', label: 'Komoditas', field: 'komoditas' },
        { name: 'mt', align: 'left', label: 'Masa Tanam', field: 'mt' },
        { name: 'tahun', align: 'left', label: 'Tahun', field: 'tahun' },
        { name: 'jumlahPetani', align: 'left', label: 'Jumlah Petani', field: 'jumlahPetani' },
        { name: 'totalUrea', align: 'left', label: 'Total Urea', field: 'totalUrea' },
        { name: 'totalNpk', align: 'left', label: 'Total NPK', field: 'totalNpk' },
        { name: 'totalNpkFk', align: 'left', label: 'Total NPK FK', field: 'totalNpkFk' },
        { name: 'status', align: 'left', label: 'Status', field: 'status' },
        { name: 'total', align: 'left', label: 'Total', field: 'total' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      activeData: null,
      activeStatus: null,
      fileImport: null,
      filter: '',
      listSubsektor: [],
      subsektor: null,
      listKomoditas: [],
      komoditas: null,
      mt: null,
      tahun: new Date().getFullYear(),
      pagination: {
        sortBy: 'transaksi_id',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      }
    }
  },
  async created () {
    // await this.$resetArea()
    if (this.kab) {
      this.$store.commit('area/updateKabupaten', this.$getProfile()?.member?.reg_regencies)
    }
    if (this.kec) {
      this.$store.commit('area/updateKecamatan', this.$getProfile()?.member?.reg_districts)
    }
    this.getData()
    this.getSubsektor()
  },
  methods: {
    getStatus,
    exportFile () {
      const header = ['Kode Transaksi', 'Area', 'Tanggal', 'Kios', 'Komoditas', 'Masa Tanam', 'Tahun', 'Jumlah Petani', 'Total Urea', 'Total NPK', 'Total NPK FK', 'Status', 'Total']
      const data = this.rows.map(row => [
        `${row.kode_transaksi}`,
        `${row.provinsi ?? ''} - ${row.Kabupaten} - ${row.kecamatan} - ${row.desa}`,
        this.$parseDate(row.tanggaltransaksi).timeStap,
        `${row.nama_kios}`,
        `${row.komoditas}`,
        `${row.masatanam}`,
        `${row.tahun}`,
        `${row.totalPetani}`,
        `${row.totalUrea} Kg`,
        `${row.totalNpk} Kg`,
        `${row.totalNpkFk ?? 0} Kg`,
        `${this.getStatus(row.statustransaksi).label}`,
        `${this.$formatPrice(row.totaltransaksi)}`
      ])

      const headerRow = header.join(';')
      const dataRows = data.map(row => row.join(';'))

      const csvData = [headerRow, ...dataRows].join('\n')

      this.$exportToCsv('DataPenebusan.csv', csvData)
    },
    onRequest (props) {
      this.loading = true
      const params = {
        kab: this.$store.state.area.kabupaten ? this.$store.state.area.kabupaten.name : '',
        kec: this.$store.state.area.kecamatan ? this.$store.state.area.kecamatan.name : '',
        desa: this.$store.state.area.desa ? this.$store.state.area.desa.name : '',
        sektor: this.subsektor ? this.subsektor.sektor : '',
        komoditas: this.komoditas ? this.komoditas.komoditas : '',
        masatanam: this.mt,
        tanggal: this.date
      }
      this.$axios.get('alokasi/transaksi-subsidi', this.$createPaginate(props, params))
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
            this.pagination = res.data.paginate
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getData () {
      this.onRequest({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    getSubsektor () {
      helper.getSubsektor(this.$createToken())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.listSubsektor = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    async getKomoditas () {
      this.komoditas = null
      await helper.getKomoditas(this.subsektor.id)
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.listKomoditas = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
      this.getData()
    }
  }
}
</script>
