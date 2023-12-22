<template>
  <q-page style="background: #EFF6F1">
    <div style="background: #32573F; height: 80px"></div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  q-mt-xl q-mb-md  q-pa-sm q-pt-md`">
      <div class="row justify-between">
        <div class="col-6">
          <h2 class="text-weight-medium">Selamat Datang di,</h2>
          <h2 class="text-weight-medium">Klinik Perkebunan</h2>
          <div class="">
            Selamat datang di Aplikasi Klinik Perkebunan! Dapatkan solusi pertanian terbaik dengan saran ahli dan alat
            inovatif, semua hanya dalam satu aplikasi. Kami bekerja sama dengan UPTD Balai Perlintanbun Dinas Perkebunan
            Provinsi Lampung untuk memberikan dukungan terbaik bagi pertanian di daerah Anda. Meningkatkan hasil tanaman
            Anda tanpa ribet. Jelajahi sekarang!
          </div>
          <div style="margin-top: 20px;">
            <q-btn  href="fitur/6/34/82/pekebun/pengajuan" class="text-bold" style="background: #32573F; color: white; margin-right: 10px;" label="Lakukan pelaporan" />
            <q-btn href="fitur/6/34/83/pekebun/pengajuan" outline class="text-bold" style="color: #32573F" label="Riwayat pengajuan" />
          </div>
          <q-btn href="member" class="text-bold" style="background: #000; color: #fff; margin-top: 10px;" label="Kembali Ke Menu Utama" />
        </div>
        <div class="col-4">
          <img src="klinik-perkebunan/dashboard.png" style="width: 100%" /><br />
        </div>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  q-mt-xl q-mb-md  q-pa-sm q-pt-md`">
      <div class="row justify-between" style="align-items: center; margin-bottom: 50px;">
      <div style="border-left: 15px solid #32573F; padding-left: 20px; " class="text-h5">Informasi Penyakit</div>
      <div>
        <q-btn outline class="text-bold" style="color: black; margin-top: 10px;" label="Lihat Seluruh Artikel" />
      </div>
      </div>
      <div class="row">
        <q-card v-for="article in articles" :key="article.id" :style='"margin-left: 10px;"' class='col-3'>
        <img src="https://cdn.quasar.dev/img/mountains.jpg">

        <q-card-section>
          <div class="text-h6">{{ article.judul }}</div>
          <div class="text-subtitle2">{{ truncateString(article.narasi, 50)  }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn  :href="'fitur/6/34/82/pekebun/artikel/'+ article.id " class="full-width text-bold" style="background: #32573F; color: white; margin-right: 10px;" label="Baca Artikel" />
        </q-card-section>
      </q-card>
    </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  q-mt-xl q-mb-md  q-pa-sm q-pt-md`">
      <div class="row " style="align-items: center; margin-bottom: 50px;">
        <div class="col-6">
          <div style="border-left: 15px solid #32573F; padding-left: 20px; " class="text-h5">Profile UPTD</div>
          <p style="font-weight: 400; font-size: 24px; margin-top: 30px;">
            UPTD BALAI PERLINDUNGAN TANAMAN DINAS PERKEBUNAN PROVINSI LAMPUNG
          </p>
          <p>
            Terwujudnya tanaman perkebunan yang sehat, berproduksi tinggi, kualitas (mutu) hasil lebih baik yang terbebas dari residu dan emisi bahan pencemar terhadap manusia, hewan peliharaan serta lingkungan hidup, melalui pengembangan teknologi yang berwawasan kaidah-kaidah pengendalian hama terpadu (PHT),
          </p>
          <p>
            Jl. Raya Tegineneng Km.36, Kab. Pesawaran, Kota Bandar Lampung, Lampung 35211
          </p>
          <p>
            irsanagung@gmail.com
          </p>
        </div>
        <div class="col-6">
          <q-card-section class="q-pt-none">
          <GoogleMap :api-key="$mapsApiKey" style="height: 300px" :center="$map.center" :zoom="$map.zoom">
            <Marker :options="{ position: markers }" />
          </GoogleMap>
        </q-card-section>
        </div>

      </div>
      </div>

    <div class="bg-yellow2 text-bold text-black flex flex-center absolute-bottom">
      <span>Copyright © 2023 Kartu Petani Berjaya. All Right Reserved</span>
    </div>
  </q-page>
</template>

<script>
import { GoogleMap, Marker } from 'vue3-google-map'
export default {
  components: {
    GoogleMap,
    Marker
  },
  setup () {

  },
  data () {
    return {
      articles: []
    }
  },
  async created () {
    this.getData()
  },
  methods: {
    async getData () {
      this.loading = true

      this.$axios.get('klinik/artikels', {
        params: {
          page: 1,
          pageSize: 4
        }
      })
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res, false)) {
            this.articles = res.data.result.articles
          }
        }).catch(() => this.$commonErrorNotif())
    },
    truncateString (str, num) {
      if (str.length > num) {
        return str.slice(0, num) + '...'
      } else {
        return str
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card

</style>
