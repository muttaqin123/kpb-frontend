<template>
  <q-page padding>
    <q-skeleton v-if="loading" height="350px" class="my-card"/>
    <div v-if="data && (!loading)">
      <div class="col-12">
        <q-card class="my-card" flat>
          <q-card-section>
            <q-carousel
              arrows
              animated
              v-model="data.carouselActive"
              autoplay
              infinite
              style="width: 100%;"
              v-if="data.opt_berkas_informasi.length > 0"
            >
              <q-carousel-slide v-for="(f, j) in data.opt_berkas_informasi" :key="j" :name="f.id_opt_berkas_informasi" :img-src="`${$baseURL}opt-informasi/${f.namafile}`"/>
            </q-carousel>
            <!-- <div class="q-mt-md">
              {{data.opt_kategori_informasi_opt_informasiToopt_kategori_informasi.isikategori}}
            </div>
            <div class="text-h6">{{ data.judulinformasi }}</div>
            <div class="text-caption text-grey-7">{{ $parseDate(data.tanggalinformasi).fullDate }}</div>
            <div v-html="data.isiinformasi"></div> -->
          </q-card-section>
          <q-card-section>
            <div class="row no-wrap items-center">
              <div class="col">
                <div>
                  {{data.opt_kategori_informasi_opt_informasiToopt_kategori_informasi.isikategori}}
                </div>
              </div>
              <div class="col-auto row no-wrap items-center">
                <q-btn :href="`${$baseURL}opt-informasi/${data.filePdf}`" type="a" target="_blank" unelevated color="primary" icon="download" label="Download Lampiran"/>
              </div>
            </div>
            <div class="text-h6">{{ data.judulinformasi }}</div>
            <div class="text-caption text-grey-7">{{ $parseDate(data.tanggalinformasi).fullDate }}</div>
            <div v-html="data.isiinformasi"></div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      data: null,
      loading: true
    }
  },
  created () {
    this.$axios.get(`opt/informasi/${this.$route.params.id}`, this.$createToken())
      .finally(() => { this.loading = false })
      .then(res => {
        if (this.$parseResponse(res.data, false)) {
          const data = res.data.result[0]
          data.carouselActive = data.opt_berkas_informasi.length > 0 ? data.opt_berkas_informasi[0].id_opt_berkas_informasi : null
          this.data = data
        }
      }).catch(() => this.$commonErrorNotif())
  }
}
</script>
