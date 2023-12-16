<template>
  <q-page padding>
    <q-skeleton v-if="loading" height="350px" class="my-card"/>
    <div v-else class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div class="col-12" v-for="(d, i) in datas" :key="i">
        <q-card class="my-card" flat>
          <q-card-section>
            <q-card-section>
              <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <q-carousel
                    arrows
                    animated
                    v-model="d.carouselActive"
                    autoplay
                    infinite
                    style="min-height: 200px;max-height: 250px;"
                    v-if="d.opt_berkas_informasi.length > 0"
                  >
                    <q-carousel-slide v-for="(f, j) in d.opt_berkas_informasi" :key="j" :name="f.id_opt_berkas_informasi" :img-src="`${$baseURL}opt-informasi/${f.namafile}`"/>
                  </q-carousel>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                  <div>{{d.opt_kategori_informasi_opt_informasiToopt_kategori_informasi.isikategori}}</div>
                  <div class="text-h6">{{ d.judulinformasi }}</div>
                  <div class="text-caption text-grey-7">{{ $parseDate(d.tanggalinformasi).fullDate }}</div>
                  <div>{{ removeTags(sliceText(d.isiinformasi)) }}</div>
                  <div class="q-mt-sm">
                    <q-btn color="primary" :to="{name: 'detailInformasiPetani', params: {id: d.id_opt_informasi}}" unelevated label="Lihat Selengkaptnya"/>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card-section>

          <q-separator />
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      datas: [],
      loading: true
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get('opt/informasi', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.datas = this.mapData(res.data.result)
          }
        }).catch(() => this.$commonErrorNotif())
    },
    mapData (datas) {
      const list = Array.from(datas)
      return list.map(r => {
        return {
          ...r,
          carouselActive: r.opt_berkas_informasi.length > 0 ? r.opt_berkas_informasi[0].id_opt_berkas_informasi : null
        }
      })
    },
    sliceText (text) {
      const maxLarscreen = 400
      const maxSmallScreen = 300

      let newText = text.slice(0, maxSmallScreen)
      if (this.$q.screen.gt.sm) {
        newText = text.slice(0, maxLarscreen)
      }

      return `${newText}..`
    },
    removeTags (str) {
      if ((str === null) || (str === '')) { return false } else { str = str.toString() }

      return str.replace(/(<([^>]+)>)/ig, '')
    }
  }
}
</script>
<style>
.my-card {
  /* background-color: red; */
  border-radius: 15px
}
.img-news {
  border-radius: 15px;
  /* padding: 100px; */
}
</style>
