<template>
  <q-page v-if="loaded" :class="this.$q.screen.xs ? '' : 'q-px-xl'" padding style="background: #F2F7F5">
    <div class="q-pa-md bg-white">
      <div class="row">
        <div class="col-lg-4 col-sm-12 col-xs-12">
          <q-img :src="`${this.$urlImagePemasaran}/file/api/v1/produk/foto/${data.foto[0].nama_foto}`" style="border-radius: 10px" width="100%"/>
        </div>
        <div class="col column q-pa-md q-gutter-sm">
          <span class="text-h4">{{ data.nama_produk }}</span>
          <span class="text-h5 text-weight-bold">{{ this.$formatPrice(data.harga) }}</span>
          <q-separator/>
          <span class="text-h6 text-weight-medium">
            Rating Produk
          </span>
          <q-rating
            v-model="data.rating"
            size="3em"
            :max="5"
            icon="star_border"
            icon-selected="star"
            color="green-10"
          />
          <q-separator/>
          <span class="text-h6 text-weight-medium">
            Spesifikasi Produk
          </span>
          <div class="column">
            <div
              v-for="(spesifikasi,i) in data.spesifikasi"
              :key="i"
              class="row q-my-sm">
              <span class="q-mr-md text-grey-8" style="width: 100px">{{ spesifikasi.nama_spesifikasi }}</span>
              <span>{{ spesifikasi.tetapan_spesifikasi }}</span>
              </div>
          </div>
          <q-separator/>
          <span class="text-h6 text-weight-medium">
            Deskripsi Produk
          </span>
          <span class="text-subtitle">
          {{ data.deskripsi }}
          </span>
        </div>
      </div>
    </div>
    <div class="q-pa-md q-mt-sm bg-white">
      <div class="q-mx-md">
        <div class="row items-center">
          <div class="col-auto flex flex-center" style="border: solid 2px black; border-radius: 1000px; padding: 5px">
            <img :src="`${this.$urlImagePemasaran}/file/api/v1/toko/logo/${data.toko.gambar_toko}`" alt="" style="width: 40px; height: 40px">
          </div>
          <div class="col column q-ml-sm">
            <span class="text-h6">{{ data.toko.nama_toko }}</span>
            <div class="row q-gutter-sm">
              <q-btn :href="`https://wa.me/${data.toko.no_wa}`" outline no-caps color="green-10" label="Pesan Sekarang" icon="mdi-whatsapp"/>
              <q-btn @click="this.$router.push({ name: 'toko', params: { idToko: data.toko.toko_id }})" no-caps color="green-10" label="Kunjungi Toko" icon="mdi-store"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      loaded: false,
      data: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$showLoading()
      this.$api.get(`produk/${this.$route.params.id}/produk`)
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          this.loaded = true
          this.data = res.data
          if (this.data.toko.no_wa.length <= 0) {
            this.getNik()
          } else {
            this.data.toko.no_wa = this.data.toko.no_wa.replace('08', '62')
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    getNik () {
      this.$showLoading()
      this.$axios.post('check/encryptionString', {
        isEnc: 0,
        string: this.data.toko.nik
      }).finally(() => this.$hide())
        .then((res) => {
          this.getMember(res.data.result.result)
        })
        .catch(() => this.$commonErrorNotif())
    },
    getMember (nik) {

    }
  }
}
</script>
