<template>
  <q-page padding style="background: #F2F7F5; color: #024830">
    <div class="column">
      <span class="text-h6 text-weight-bold">Dashboard OKKP-D</span>
      <span>Pusat Kendali layanan sertifikasi Kompeten Keamanan Pangan Daerah</span>
      <div class="q-gutter-sm q-mt-md">
        <q-btn label="Lihat seluruh pengajuan" color="green-10"/>
        <q-btn label="Survei Kepuasan Pelanggan" color="green-10"/>
      </div>
      <q-separator class="q-my-lg"/>
      <div class="row" style="width: 100%">
        <div
          v-for="(i, index) in list"
          :key="index"
          class=" col-sm-6 col-xs-12 col-md-3 q-pa-sm">
          <div class="border-shadow flex flex-center column">
            <div class="q-pa-sm column flex flex-center">
              <div :class="`${i.background} ${i.color}  q-pa-sm`" style="border-radius: 10px">
                {{ i.label }}
              </div>
              <span class="text-h4 text-weight-bold q-mt-md">{{ i.nilai }}</span>
              <span>{{ i.desc }}</span>
              <!-- <q-btn label="Lihat Detail" no-caps color="green-10" outline class="q-mt-md"/> -->
            </div>
            <div :class="`${i.background} q-mt-sm`" style="height: 10px; width: 100%; border-radius: 0px 0px 2px 2px "></div>
          </div>
        </div>
      </div>
      <div class="q-mt-md"
          style="width: 100%">
        <span class="text-weight-bold text-h6">Data Penerbitan HC/SC</span>
        <q-table
          flat
          bordered
          :rows="row"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="aksi" :props="props">
                <q-btn label="Detail" no-caps color="green-10"/>
              </q-td>
              <q-td key="status" :props="props">
                <q-badge class="q-pa-xs" :color="array[getIndexByKey(String(props.row.status))].color">{{ array[getIndexByKey(String(props.row.status))].label }}</q-badge>
              </q-td>
              <q-td key="tgl" :props="props">
                {{ props.row.tanggal_penerbitan }}
              </q-td>
              <q-td key="perusahaan" :props="props">
                {{ props.row.okkpd_form_permohonan.nama_perusahaan }}
              </q-td>
              <q-td key="nosc" :props="props">
                {{ props.row.noScHc ?? '-' }}
              </q-td>
              <q-td key="komoditi" :props="props">
                {{ props.row.jenis_komoditi }}
              </q-td>
              <q-td key="identitas" :props="props">
                {{ props.row.identtitas_lot ?? '-' }}
              </q-td>
              <q-td key="jumlah" :props="props">
                {{ props.row.jumlah_lot }}
              </q-td>
              <q-td key="tonase" :props="props">
                {{ props.row.tonase ?? '-' }}
              </q-td>
              <q-td key="negara" :props="props">
                {{ props.row.negara_tujuan }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {
          label: 'Verifikasi Berkas',
          color: 'text-yellow-10',
          background: 'bg-orange-2',
          desc: 'Permohonan',
          nilai: 0
        },
        {
          label: 'Kunjungan Lapangan',
          color: 'text-blue-10',
          background: 'bg-light-blue-2',
          desc: 'Permohonan',
          nilai: 0
        },
        {
          label: 'Analisa hasil lab',
          color: 'text-yellow-10',
          background: 'bg-orange-2',
          desc: 'Permohonan',
          nilai: 0
        },
        {
          label: 'Berhasil',
          color: 'text-green-10',
          background: 'bg-light-green-2',
          desc: 'Permohonan',
          nilai: 0
        }
      ],
      row: [],
      columns: [
        {
          name: 'aksi',
          label: 'Aksi',
          field: 'aksi',
          align: 'left'
        },
        { name: 'status', align: 'left', label: 'Status', field: 'status' },
        { name: 'tgl', label: 'Tgl Penerbitan', field: 'tgl' },
        { name: 'perusahaan', label: 'Perusahaan', field: 'perusahaan' },
        { name: 'nosc', label: 'No.SC/HC', field: 'nosc' },
        { name: 'komoditi', label: 'Komoditi', field: 'komoditi' },
        { name: 'identitas', label: 'Identitas Lot', field: 'identitas' },
        { name: 'jumlah', label: 'Jumlah Lot', field: 'jumlah' },
        { name: 'tonase', label: 'Tonase', field: 'tonase' },
        { name: 'negara', label: 'Negara Tujuan', field: 'negara' }
      ],
      array: [
        {
          label: 'Verifikasi Berkas',
          key: '0',
          color: 'warning'
        },
        {
          label: 'Kunjungan Lapangan',
          key: '1',
          color: 'warning'
        },
        {
          label: 'Verifikasi Laboratorium',
          key: ['2', '3'],
          color: 'warning'
        },
        {
          label: 'Berhasil',
          key: ['4', '5', '6', '7'],
          color: 'green-8'
        },
        {
          label: 'Gagal',
          key: '8',
          color: 'negative'
        }
      ]
    }
  },
  created () {
    this.getJumlah()
    this.getData()
  },
  methods: {
    getIndexByKey (key) {
      const index = this.array.findIndex(item => {
        if (Array.isArray(item.key)) {
          return item.key.includes(key)
        } else {
          return item.key === key
        }
      })

      return index !== -1 ? index : -1
    },
    getData () {
      this.$showLoading()
      this.$axios.get('okkpd/getSCHC', this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          this.row = res.data.result
          // // console.log(this.row)
        })
        .catch(() => this.$commonErrorNotif())
    },
    getJumlah () {
      this.$showLoading()
      this.$axios.get('okkpd/getData', this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          const data = res.data.result
          for (const i in data) {
            if (data[i].status !== 8 && data[i].status !== 9 && data[i].status !== 10) {
              this.list[this.getIndexByKey(String(data[i].status))].nilai += 1
            }
          }
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
