<template>
  <q-page padding>
    <!-- <q-card class="q-mb-md" flat>
      <q-card-section>
        Filter Data
        <div class="row q-col-gutter-x-md">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-select
              :options="listSubsektor"
              v-model="subsektor"
              label="Subsektor"
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-select
              :options="listKomoditas"
              v-model="komoditas"
              label="Komoditas"
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-select
              :options="[]"
              v-model="mt"
              label="Masa Tanam/Usia Tanam"
            />
          </div>
        </div>
      </q-card-section>
    </q-card> -->
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
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Cari By Nominal">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="kodeTransaksi" :props="props">
            {{ props.row.kode_transaksi }}
          </q-td>
          <q-td key="tanggal" :props="props">
            {{ $parseDate(props.row.tanggaltransaksi).timeStap }}
          </q-td>
          <q-td key="poktan" :props="props">
            {{ props.row.nama_poktan }}
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
          <q-td key="buktibayar" :props="props">
            <q-btn
              :disable="props.row.bukti_tf === '-' || props.row.bukti_tf === null"
              label="Lihat File"
              unelevated
              outline
              color="primary"
              type="a"
              target="_blank"
              :href="`${$baseURL}file-bukti-transfer/${props.row.bukti_tf}`"
            />
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Cetak Nota" type="a" target="_blank" :to="{name: 'notaPuberKios', params: { ...$getParams($route), idTransaksi: props.row.transaksi_id }}" outline color="primary" unelevated/>
              <q-btn label="Tolak Pembayaran" @click="updateStatus(props.row.transaksi_id, 5)" :disabled="!(Number(props.row.statustransaksi) === 1)" outline color="primary" unelevated/>
              <q-btn label="Konfirmasi Pembayaran" @click="updateStatus(props.row.transaksi_id, 2)" :disabled="!(Number(props.row.statustransaksi) === 1)" outline color="primary" unelevated/>
              <q-btn label="Kirim Barang" @click="updateStatus(props.row.transaksi_id, 3)" :disabled="!(Number(props.row.statustransaksi) === 2)" outline color="primary" unelevated/>
              <q-btn label="Detail Transaksi" :to="{name: 'detailPenebusanPuberKios', params: { idTransaksi: props.row.transaksi_id }}" color="primary" unelevated/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
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
        { name: 'poktan', align: 'left', label: 'Poktan', field: 'poktan' },
        { name: 'komoditas', align: 'left', label: 'Komoditas', field: 'komoditas' },
        { name: 'mt', align: 'left', label: 'Masa Tanam', field: 'mt' },
        { name: 'tahun', align: 'left', label: 'Tahun', field: 'tahun' },
        { name: 'jumlahPetani', align: 'left', label: 'Jumlah Petani', field: 'jumlahPetani' },
        { name: 'totalUrea', align: 'left', label: 'Total Urea', field: 'totalUrea' },
        { name: 'totalNpk', align: 'left', label: 'Total NPK', field: 'totalNpk' },
        { name: 'totalNpkFk', align: 'left', label: 'Total NPK FK', field: 'totalNpkFk' },
        { name: 'status', align: 'left', label: 'Status', field: 'status' },
        { name: 'total', align: 'left', label: 'Total', field: 'total' },
        { name: 'buktibayar', align: 'left', label: 'Bukti Bayar', field: 'buktibayar' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
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
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getStatus,
    onRequest (props) {
      this.loading = true
      this.$axios.get(`alokasi/transaksi-subsidi?kios=${this.$getProfile().nik}`, this.$createPaginate(props))
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
            console.log(this.rows)
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
    },
    onSubmit () {
      this.$showLoading()
    }
  }
}
</script>
