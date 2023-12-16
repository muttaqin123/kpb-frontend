<template>
  <q-page style="background: #EFF6F1">
    <div style="background: #32573F; height: 80px"></div>
    <div class="q-mx-xl absolute-top" style="margin-top: 55px">
      <div class="bg-white q-pa-sm ">
        <q-btn class="q-mx-sm" rounded icon="mdi-arrow-left" @click="this.$router.go(-1)" dense flat/>
        <span class="text-bold">Riwayat Data Pengajuan</span>
      </div>
    </div>
    <div class="q-mx-xl q-mt-xl q-mb-sm column bg-white q-pa-md rounded">
      <span class="text-h6 text-bold q-mb-sm">Data Pengajuan Anda</span>
      <div class="row">
        <q-input outlined placeholder="Cari Transaksi" dense>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="row items-center">
        <div class="col-xs-12 col-sm-auto">
          <span>Status</span>
        </div>
        <div class="col-xs-12 col-sm-11">
          <q-scroll-area
            style="width: 100%; height: 55px">
            <div class="row items-center no-wrap">
              <div class="col-xs-12 col-md-auto q-pa-sm">
                <q-tabs
                  v-model="tab"
                  dense
                  inline-label
                  mobile-arrows
                  class="text-grey-8"
                  active-class="text-green-10 border"
                  indicator-color="transparent"
                  no-caps
                  @update:model-value="filter"
                >
                  <q-tab
                    v-for="(tab, i) in listTab"
                    :key="i"
                    :name="tab.value"
                    :label="tab.label" />
                </q-tabs>
              </div>
            </div>
          </q-scroll-area>
        </div>
      </div>
      <q-scroll-area
        class="q-mt-sm"
        :style="`height: ${this.$q.screen.height - 400}px`">
        <div class="q-mx-sm q-pa-md rounded bg-white column" style="border: 1px solid #32573F">
          <div class="row items-center q-mb-md">
            <span class="text-weight-bold text-body1">Pengajuan Permohonan</span>
            <span class="q-mx-sm">|</span>
            <span>28 Febuari 2023</span>
            <q-badge color="info" class="q-mx-sm">
              <span>Verifikasi Berkas</span>
            </q-badge>
          </div>
          <div class="row items-center justify-between">
            <div class="col-auto column q-gutter-sm">
              <span class="text-h5 text-weight-bold">Komoditas Padi</span>
              <span>SPP000001</span>
            </div>
            <div class="col-auto">
              <q-btn :to="{ name: 'detailPengajuanSertifBenihMember', params: { id: 1 } }" label="Lihat Detail" no-caps flat dense color="green-10"/>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      tab: 0,
      listTab: [
        {
          label: 'Semua',
          value: 0,
          data: 'semua'
        },
        {
          label: 'Verifikasi Berkas',
          value: 1,
          data: [0]
        },
        {
          label: 'Kunjungan Lapangan',
          value: 2,
          data: [1]
        },
        {
          label: 'Laporan Pengujian',
          value: 3,
          data: [2]
        },
        {
          label: 'Sertifikat',
          value: 4,
          data: [3]
        },
        {
          label: 'Gagal',
          value: 5,
          data: [4]
        }
      ]
    }
  },
  methods: {
    filter (val) {
      const data = this.listTab[val]
      console.log(data)
    }
  }
}
</script>
