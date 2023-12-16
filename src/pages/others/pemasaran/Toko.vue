<template>
  <q-page v-if="loaded" :class="this.$q.screen.xs || this.$q.screen.sm ? '' : 'q-px-xl'" padding style="background: #F2F7F5">
    <div class="row items-center">
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <q-img v-if="data.toko_personalisasi.toko_foto_banner.length > 0" :src="`${this.$urlImagePemasaran}/file/api/v1/toko/banner/${data.toko_personalisasi.toko_foto_banner[0].nama_file}`" img-class="custom-banner" :style="`border-radius: 5px; ${this.$q.screen.xs ? 'height: 100px;' : 'height: 170px;'}`">
          <div class="absolute-full text-subtitle2 row items-center">
            <div class="col q-mx-md">
              <div class="row items-center">
                <div class="col-auto flex flex-center" style="border: solid 2px black; border-radius: 1000px; padding: 5px; background: #dfdfdf">
                  <img :src="`${this.$urlImagePemasaran}/file/api/v1/toko/logo/${data.toko.gambar_toko}`" alt="" style="width: 40px; height: 40px">
                </div>
                <div class="col column q-ml-sm">
                  <span class="text-h6">{{ data.toko.nama_toko }}</span>
                  <span>{{ data.toko.slogan }}</span>
                </div>
              </div>
            </div>
          </div>
        </q-img>
      </div>
      <div class="col q-ml-lg column text-grey-8 q-mt-md">
        <div class="row">
          <div class="col-4 column q-gutter-md">
            <span>
              <span class="text-weight-bold">Nama Pemilik: </span>
            </span>
            <span>
              <span class="text-weight-bold">Alamat Toko: </span>
            </span>
            <span>
              <span class="text-weight-bold">Deskripsi Toko: </span>
            </span>
            <span>
              <span class="text-weight-bold">Kabupaten: </span>
            </span>
          </div>
          <div class="col column q-gutter-md text-green-10">
            <span>
              {{ data.toko.nama }}
            </span>
            <span>
              {{ data.toko.alamat }}
            </span>
            <span>
              {{ data.toko.deskripsi }}
            </span>
            <span>
              {{ data.toko.nama_kabupaten }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-sm">
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        autoplay
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
      >
        <template
          v-for="(image, i) in data.toko_personalisasi.toko_foto_banner"
          :key="i">
          <q-carousel-slide :name="i" :img-src="`${this.$urlImagePemasaran}/file/api/v1/toko/banner/${image.nama_file}`" />
        </template>
      </q-carousel>
    </div>
    <div class="q-pa-sm">
      <span class="text-h6 text-weight-bold text-grey-8">Daftar Etalase</span>
      <q-scroll-area :style="`width: ${this.$q.screen.width}px; height: 80px`" class="">
        <div class="row no-wrap">
          <div
            v-for="(etalase, i) in data.etalase"
            :key="i"
            class="col-3 q-mx-sm q-pa-sm border-shadow column">
            <span class="text-h6 text-grey-10">{{ etalase.nama_etalase }}</span>
            <span class="text-green-10">{{ etalase.keterangan }}</span>
          </div>
        </div>
      </q-scroll-area>
    </div>
    <div class="q-pa-sm">
      <span class="text-h6 text-weight-bold text-grey-8">Daftar Produk</span>
      <div class="col-md-9 col-sm-12 col-xs-12">
        <div class="row">
          <div
            v-for="(barang,i) in produk"
            :key="i"
            clickable
            @click="this.$router.push({ name: 'detailPemasaran', params: { id: barang.produk_id } })"
            class="col-md-4 col-sm-6 col-xs-12 q-pa-xs my-card" style="height: 100%">
            <q-card style="height: 100%">
              <img :src="`${this.$urlImagePemasaran}/file/api/v1/produk/foto/${barang.foto[0].nama_foto}`"
                style="width: 100%; height: 300px; object-fit: fill;">
              <q-card-section>
                <div class="ellipsis-2-lines">{{ barang.nama_produk }}</div>
                <div class="text-weight-bold">{{ this.$formatPrice(barang.harga) }}</div>
              </q-card-section>

              <q-card-section class="q-pt-none column">
                <span class="text-caption">Stok Tersedia : {{ barang.stok }}</span>
                <span class="text-caption">{{ barang.toko.nama_toko }}</span>
                <span class="text-caption">{{ barang.toko.alamat }}</span>
              </q-card-section>
            </q-card>
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
      slide: 1,
      loaded: false,
      data: null,
      produk: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$showLoading()
      this.$api.get(`toko/${this.$route.params.idToko}`)
        .then((res) => {
          console.log(res)
          this.data = res.data
        })
        .catch(() => this.$commonErrorNotif())
      this.$api.get('produk/toko', {
        params: {
          page: 0,
          size: 100,
          status: true,
          statusAdmin: true,
          type: 'pemasaran',
          tokoId: this.$route.params.idToko
          // kategoriIdList: Number(this.komoditas[0])
        }
      }).finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          this.loaded = true
          this.produk = res.data.content
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
<style>
  .custom-banner {
    filter: blur(1px)
  }
  .my-card:hover {
    cursor: pointer;
  }
</style>
