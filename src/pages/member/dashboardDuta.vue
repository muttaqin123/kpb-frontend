<template>
  <q-page style="background: #F3F8FF">
    <div :class="`column q-pt-lg ${this.$q.screen.xs ? '' : 'q-px-xl'}`" style="background-color: #193D78;">
      <div class="row justify-between q-pa-md">
        <div class="col-auto">
          <q-btn label="Menu Utama" rounded color="white" text-color="primary" no-caps icon="arrow_back" :to="{ name: 'indexLayanan' }"/>
        </div>
        <div class="col-auto">
          <q-btn label="Bantuan" rounded outline color="white" text-color="white" icon-right="help_center" no-caps/>
        </div>
      </div>
      <div class="q-pa-md q-mb-md" style="width: 100%">
        <img src="img/duta/banner-duta.png" alt="banner-duta" style="width: 100%"/>
      </div>
    </div>
    <div :class="`column q-mt-md ${this.$q.screen.xs ? '' : 'q-px-xl'}`">
      <div class="q-pa-sm q-ma-sm border-shadow row items-center justify-between">
        <div class="col-xs-12 col-md-8 col-sm-8 q-mr-sm q-gutter-sm q-pa-sm">
          <div class="text-primary text-h5 text-weight-bold">
            Apa Kegiatan Yang Sudah Kamu Lakukan Hari Ini?
          </div>
          <div>Upload Dokumentasi Kegiatan Kamu Seputar E-KPB</div>
          <q-btn label="Upload Kegiatan" no-caps color="primary" :to="{ name: 'tambahAktivitas', params: {idFitur: 46}}"/>
        </div>
        <div class="col-auto q-pa-sm" v-if="!this.$q.screen.xs">
          <img src="img/duta/help.png" width="100"  class="flex flex-center"/>
        </div>
      </div>
      <div v-if="data.length !== 0" class="row">
        <div
          v-for="(kegiatan, i) in data"
          :key="i"
          class="q-pa-sm col-lg-2 col-md-3 col-sm-6" :style="this.$q.screen.xs ? 'width: 100%' : ''">
          <q-card>
            <img :src="`${this.$baseURL}file-duta/${kegiatan.image[0]}`" :style="`object-fit: cover;${this.$q.screen.xs || this.$q.screen.sm ? 'height: 300px; width: 100%;' : 'height: 200px; width: 100%;'}`">
            <q-card-section>
              <div class="text-weight-bold">{{ kegiatan.sebagai }}</div>
              <div class="text-weight-normal ellipsis-2-lines q-mt-xs">{{ kegiatan.nama_kegiatan }}</div>
              <div class="text-weight-thin">{{ kegiatan.tgl_kegiatan }}</div>
              <q-btn class="text-weight-medium q-mt-xs" @click="this.$router.push({ name: 'detailAktivitas', params: {idFitur: 46,id: kegiatan.id_kegiatan} })" no-caps flat dense>
                <span style="color: #193D78; text-decoration: underline;">Lihat Detail</span>
              </q-btn>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div v-else class="flex flex-center column text-center q-ma-xl q-pa-xl">
        <div class="">
          <img src="img/duta/notFound.png" alt="notFound" style="width: 50%">
        </div>
        <span class="text-h6 text-weight-bold">Kamu Belum Mengupload Kegiatan</span>
        <span>Silahkan Upload Kegiatan Kamu Seputar e-KPB</span>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      slide: 1,
      data: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$showLoading()
      this.$axios.get(`/duta/getActivity/${this.$getProfile().nik}`, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          this.data = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
