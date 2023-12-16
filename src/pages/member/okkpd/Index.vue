<template>
  <q-page padding style="background: #F2F7F5">
    <div class="column border-shadow q-ma-md q-pa-md text-green-10" >
      <span class="text-h6">Data Pengajuan Anda</span>
      <span class="">Pengajuan - pengajuan yang sudah pernah diajukan akan ditampilkan pada table</span>
      <span class="text-weight-bold q-mr-md q-mt-md q-mb-xs text-body1">Status</span>
      <q-scroll-area style="height: 60px; width: 100%;">
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
            <!-- <q-tab name="1" class="itembox q-ma-xs" label="Kunjungan Lapangan" />
            <q-tab name="2" class="itembox q-ma-xs" label="Verifikasi Laboratorium" />
            <q-tab name="3" class="itembox q-ma-xs" label="Berhasil" />
            <q-tab name="4" class="itembox q-ma-xs" label="Gagal" /> -->
          </q-tabs>
        </div>
      </q-scroll-area>
      <div class="q-mt-md column">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="border-shadow q-pa-md q-ma-sm column">
          <div class="">
            <q-badge class="q-pa-xs" :color="array[getIndexByKey(String(item.status))].color">{{ array[getIndexByKey(String(item.status))].label }}</q-badge>
          </div>
          <span class="text-h5 text-weight-bold q-mt-md">Pengajuan Permohonan</span>
          <span>{{ this.$parseDate(item.tanggal_pengajuan).timeStap }}</span>
          <div class="row q-gutter-sm">
            <q-space/>
            <q-btn :to="{ name: 'detailPermohonanOkkpd', params: {id: item.id_berkas_permohonan}}" label="lihat Detail" color="green-10" flat/>
            <!-- <q-btn v-if="item.status === 4" label="Berikan Rating" color="green-10"/> -->
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import utils from '../../sharedpages/okkpd/utilsOkkpd'
export default {
  data () {
    return {
      tab: 'semua',
      originalData: [],
      data: [],
      array: utils.array
    }
  },
  created () {
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
      this.$axios.get(`okkpd/getData/${this.$getProfile().nik}`, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res.data.result.okkpd_berkas_permohonan)
          if (res.data.status) {
            this.originalData = this.data = res.data.result.okkpd_berkas_permohonan
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    getName (val) {
      if (val === 'semua') {
        this.data = this.originalData
      } else {
        // const data = this.originalData.filter(item => item.status === val)
        const datalength = val.split(',')
        if (datalength.length === 1) {
          this.data = this.originalData.filter(item => item.status === Number(val))
        } else {
          const data = []
          for (const v in datalength) {
            // console.log(datalength[v])
            const hasil = this.originalData.filter(item => item.status === Number(datalength[v]))
            // console.log(hasil)
            if (hasil.length > 0) {
              for (let i = 0; i < hasil.length; i++) {
                data.push(hasil[i])
              }
            }
          }
          // console.log(data)
          this.data = data
        }
      }
    }
  }
}
</script>
<style>
.itembox {
  background: #FFFFFF;
  color: #024830;
  border: 1px solid #024830;
  border-radius: 8px;
}
.itembox-active {
  background: rgba(2, 72, 48, 0.16);
  color: #024830;
  border: 1px solid #024830;
  border-radius: 8px;
}
</style>
