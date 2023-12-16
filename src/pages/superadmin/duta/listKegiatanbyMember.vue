<template>
  <q-page style="background: #F3F8FF">
    <div :class="`column q-pt-md ${this.$q.screen.xs ? '' : 'q-px-xl'}`">
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
              <q-btn class="text-weight-medium q-mt-xs" @click="this.$router.push({ name: 'detailAktivitasAdmin', params: {id: kegiatan.id_kegiatan} })" no-caps flat dense>
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
      this.$axios.get(`/duta/getActivity/${this.$route.params.nik}`, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          console.log(res)
          this.data = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
