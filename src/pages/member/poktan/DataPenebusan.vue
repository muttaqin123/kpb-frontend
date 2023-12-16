<template>
  <q-page padding>
    <q-table
      title="Data Penebusan Puber"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
      row-key="nama"
      :filter="filter"
      @request="onRequest"
      v-model:pagination="pagination"
    >
      <template v-slot:top-right>
        <q-btn
          label="Export CSV"
          unelevated
          @click="exportFile()"
          color="primary"
        />
        <q-btn
          v-if="this.$getProfile().nik === '1817161718210012' || this.$getProfile().nik === '1817161718210001' || this.$getProfile().nik === '121212'"
          label="Reset Transaksi"
          unelevated
          color="primary"
          @click="resetTransaksi"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="kodeTransaksi" :props="props">
            {{ props.row.kode_transaksi }}
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
              <q-btn label="Upload Pembayaran" @click="openDialogBayar(props.row)" :disabled="!(Number(props.row.statustransaksi) === 0 || Number(props.row.statustransaksi === 5))" outline color="primary" unelevated/>
              <q-btn label="Terima Pupuk" @click="updateStatus(props.row.transaksi_id, 4)" :disabled="!(Number(props.row.statustransaksi) === 3)" outline color="primary" unelevated/>
              <q-btn label="Detail Transaksi" :to="{name: 'detailDataPenebusanPoktan', params: { idTransaksi: props.row.transaksi_id }}" color="primary" unelevated/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="dialogBayar" persistent v-if="dialogBayar">
      <q-card style="min-width: 450px">
        <q-form @submit="onSubmitPembayaran">
          <q-card-section>
            <div class="text-h6">Konfirmasi Sudah Bayar</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-file
              outlined
              bottom-slots
              accept=".jpeg, .jpg, image/*, .pdf"
              v-model="buktiBayar"
              label="Upload Bukti Bayar"
              :rules="$defaultValidation"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
              <template v-slot:hint>
                Upload File Bila Ada
              </template>
            </q-file>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Batal" v-close-popup />
            <q-btn color="primary" label="Konfirmasikan" type="submit"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import getStatus from '../../../helper/GetStatusPuber'
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'kodeTransaksi', align: 'left', label: 'Kode Transaksi', field: 'kodeTransaksi' },
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
        sortBy: 'nik',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      dialogBayar: false,
      buktiBayar: null
    }
  },
  created () {
    this.getData()
    // console.log(this.$getProfile())
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
        `${row.totalNpkFK ?? 0} Kg`,
        `${this.getStatus(row.statustransaksi).label}`,
        `${this.$formatPrice(row.totaltransaksi)}`
      ])

      const headerRow = header.join(';')
      const dataRows = data.map(row => row.join(';'))

      const csvData = [headerRow, ...dataRows].join('\n')

      this.$exportToCsv('DataPenebusan.csv', csvData)
    },
    resetTransaksi () {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah anda yakin ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$showLoading()
        // console.log(this.$getProfile())
        this.$axios.get(`check/resetTransaksi/${this.$getProfile().nik}`)
          .finally(() => this.$hide())
          .then((res) => {
            // console.log(res)
            if (res.data.status) {
              this.$notif(res.data.message, 'positive')
              this.getData()
            }
          })
          .catch(() => this.$commonErrorNotif())
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    },
    openDialogBayar (data) {
      this.activeData = data
      this.dialogBayar = true
    },
    onRequest (props) {
      this.loading = true
      this.$axios.get(`alokasi/transaksi-subsidi?poktan=${this.$getProfile().nik}`, this.$createPaginate(props))
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
    onSubmitPembayaran () {
      this.$showLoading()
      const formData = new FormData()
      if (this.buktiBayar) {
        formData.append('adaGambar', true)
        formData.append('gambar', this.buktiBayar)
      } else {
        formData.append('adaGambar', false)
      }
      formData.append('transaksi_id', this.activeData.transaksi_id)
      formData.append('statustransaksi', 1)
      this.$axios.put(`alokasi/transaksi-subsidi/${this.activeData.transaksi_id}`, formData, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.dialogBayar = false
            this.activeData = null
            this.buktiBayar = null
            this.getData()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    updateStatus (id, status) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin ?',
        persistent: true,
        cancel: true
      })
        .onOk(() => {
          this.$showLoading()
          const formData = new FormData()
          formData.append('adaGambar', false)
          formData.append('statustransaksi', status)
          this.$axios.put(`alokasi/transaksi-subsidi/${id}`, formData, this.$createToken())
            .finally(() => this.$hide())
            .then(res => {
              if (this.$parseResponse(res.data)) {
                this.getData()
              }
            }).catch(() => this.$commonErrorNotif())
        })
    }
  }
}
</script>
