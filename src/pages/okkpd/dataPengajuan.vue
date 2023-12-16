<template>
  <q-page padding style="background: #F2F7F5; color: #024830">
    <div class="row q-ma-md">
      <div class="col-md-6 col-sm-12 column">
        <span class="text-h5 text-weight-bold q-mt-sm">Data pengajuan</span>
        <span class="q-mt-sm">Seluruh data pengajuan oleh pemohon beserta status</span>
      </div>
      <div class="col-md-6 col-sm-12 column">
        <span>Cari Nama Pemohon / Perusahaan Pemohon/Kode Permohonan</span>
        <q-input v-model="filter" outlined label="Masukan nama pemohon /perusahaan pemohon" class="bg-white q-mt-sm"/>
        <div class="row">
          <q-btn label="Cari" no-caps color="green-10" class="q-mt-sm" padding="sm xl" dense/>
        </div>
      </div>
    </div>
      <q-scroll-area class="q-mt-sm" style="height: 60px; width: 100%;">
      <div class="row no-wrap items-center">
        <q-tabs
          v-model="tab"
          indicator-color="transparent"
          @update:model-value="getName"
          active-class="itembox-active"
        >
          <q-tab name="semua" class="itembox q-ma-xs" label="Semua" />
          <q-tab
            v-for="(item, index) in array"
            :key="index"
            :name="item.keyLevel"
            class="itembox q-ma-xs"
            :label="item.label" />
        </q-tabs>
      </div>
    </q-scroll-area>
    <q-table
      flat
      bordered
      :rows="row"
      :columns="columns"
      row-key="perusahaan"
      :filter="filter"
      class="width: 100%"
    >
    <template v-slot:top-right>
      <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="aksi" :props="props">
            <div class="q-gutter-sm">
              <q-btn label="Detail" no-caps :to="{ name: 'permohonanOkkpd', params: {id: props.row.id_berkas_permohonan} }" color="green-10"/>
              <q-btn label="Edit" no-caps color="warning" @click="showEdit(props.row.id_berkas_permohonan)"/>
            </div>
          </q-td>
          <q-td key="status" :props="props">
            <q-badge v-if="props.row.status !== 4" class="q-pa-xs" :color="array[getIndexByKey(String(props.row.status))].color">{{ array[getIndexByKey(String(props.row.status))].label }}</q-badge>
            <q-badge v-else class="q-pa-xs" color="positive">Berhasil Uji Lab</q-badge>
          </q-td>
          <q-td key="tgl" :props="props">
            {{ props.row.tanggal_penerbitan ?? '-' }}
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
    <q-dialog v-model="dialogEdit">
      <q-card>
        <div class="q-pa-md column">
          <span class="text-body1 text-weight-medium q-mb-md">Mengisi Data yang masih kosong</span>
          <q-form class="q-gutter-sm" @submit="onSubmit">
            <q-input outlined label="No. SC/HC" v-model="noScHc"/>
            <q-input outlined label="Identitas Lot" v-model="identitas_lot"/>
            <q-input outlined label="Tonase" v-model="tonase" type="number"/>
            <div class="row">
              <q-space/>
              <q-btn label="Submit" no-caps color="green-10" type="submit"/>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import utils from '../sharedpages/okkpd/utilsOkkpd'
export default {
  data () {
    return {
      filter: '',
      dialogEdit: false,
      id: null,
      identitas_lot: '',
      tonase: 0,
      noScHc: '',
      tab: 'semua',
      originalData: [],
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
      array: utils.array
    }
  },
  created () {
    this.getData()
  },
  methods: {
    showEdit (id) {
      this.id = id
      this.dialogEdit = !this.dialogEdit
    },
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
      this.$axios.get('okkpd/getData', this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          this.row = this.originalData = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    },
    getName (val) {
      if (val === 'semua') {
        this.row = this.originalData
      } else {
        const datalength = val.split(',')
        if (datalength.length === 1) {
          this.row = this.originalData.filter(item => item.status === Number(val))
        } else {
          const data = []
          for (const v in datalength) {
            const hasil = this.originalData.filter(item => item.status === Number(datalength[v]))
            if (hasil.length > 0) {
              for (let i = 0; i < hasil.length; i++) {
                data.push(hasil[i])
              }
            }
          }
          this.row = data
        }
      }
    },
    onSubmit () {
      this.$showLoading()
      this.$axios.put(`okkpd/updateTonase/${this.id}`, {
        tonase: this.tonase,
        noScHc: this.noScHc,
        identtitas_lot: this.identitas_lot
      }, this.$createToken()).finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          this.dialogEdit = !this.dialogEdit
          this.getData()
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
