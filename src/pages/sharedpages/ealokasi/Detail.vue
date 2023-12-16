<template>
  <q-page padding>
    <q-card flat class="q-mb-md" v-if="loaded">
      <q-card-section>
        <div class="row q-col-gutter-y-sm">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <custom-list
              title="ID Transaksi"
              :subTitle="data.kode_transaksi"
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <custom-list
              title="Poktan"
              :subTitle="data.pubers_poktan.nama_poktan"
            />
          </div>
          <!-- <div class="col-md-4 col-sm-6 col-xs-12">
            <custom-list
              title="Area"
              :subTitle="parseArea(data)"
            />
          </div> -->
          <div class="col-md-4 col-sm-6 col-xs-12">
            <custom-list
              title="Status"
            />
            <q-badge outline :color="getStatus(data.statustransaksi).color" class="q-pa-xs" :label="getStatus(data.statustransaksi).label" />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <custom-list
              title="Kios"
              :subTitle="data.pubers_kios.nama_kios"
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <custom-list
              title="Tanggal"
              :subTitle="$parseDate(data.created_at).timeStap"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-table
      title="Detail Penebusan Puber"
      flat
      :rows="data.pubers_chld_transaksi"
      :loading="loading"
      :columns="columns"
      row-key="nama"
      :filter="filter"
      v-if="loaded"
    >
      <template v-slot:top-right>
        <q-btn
          label="Export CSV"
          unelevated
          @click="exportFile()"
          color="primary"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nik" :props="props">
            {{ props.row.nik }}
          </q-td>
          <q-td key="nama_lengkap" :props="props">
            {{ props.row.member.ktp.nama }}
          </q-td>
          <q-td key="urea" :props="props">
            {{ props.row.urea }} Kg
          </q-td>
          <q-td key="npk" :props="props">
            {{ props.row.npk }} Kg
          </q-td>
          <q-td key="npkfk" :props="props">
            {{ props.row.npkfk }} Kg
          </q-td>
          <q-td key="subtotal" :props="props">
            {{ $formatPrice(props.row.subtotal) }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="-" outline color="dark" unelevated/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<script>
import customList from '../../../components/CustomList'
import getStatus from '../../../helper/GetStatusPuber'
import exportCsv from '../../../helper/ExportFile'
import parseArea from './parsearea'
export default {
  components: {
    customList
  },
  data () {
    return {
      columns: [
        { name: 'nik', align: 'left', label: 'NIK', field: 'nik' },
        { name: 'nama_lengkap', align: 'left', label: 'Nama Lengkap', field: 'nama_lengkap' },
        { name: 'urea', align: 'left', label: 'Urea', field: 'urea' },
        { name: 'npk', align: 'left', label: 'NPK', field: 'npk' },
        { name: 'npkfk', align: 'left', label: 'NPK FK', field: 'npk' },
        { name: 'subtotal', align: 'left', label: 'Subtotal', field: 'subtotal' }
      ],
      loading: false,
      filter: '',
      data: null,
      loaded: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    parseArea,
    getStatus,
    getData () {
      this.$axios.get(`alokasi/transaksi-subsidi/${this.$route.params.idTransaksi}`, this.$createToken())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.data = res.data.result
            this.loaded = true
          }
        })
    },
    exportFile () {
      const content = [
        'NIK;Nama Lengkap;Urea (Kg);NPK (Kg);NPK FK (Kg);Subtotal'
      ].concat(
        this.data.pubers_chld_transaksi.map(row => {
          return `'${row.nik};${row.member.ktp.nama};${row.urea};${row.npk};${row.npkfk};${this.$formatPrice(row.subtotal)}`
        })
      ).join('\r\n')

      exportCsv(`DetailTransaksi(${this.data.kode_transaksi})`, content)
    }
  }
}
</script>
