<template>
  <q-page padding class="">
    <q-carousel
      arrows
      infinite
      :autoplay="autoplay"
      animated
      control-text-color="white"
      control-color="primary"
      control-type="unelevated"
      v-model="slide"
      ref="carousel"
      height="400px"
    >
      <q-carousel-slide name="1" img-src="img/jelabat.png">
        <div class="absolute-bottom custom-caption">
          <div class="text-h5">Selamat Datang Di E-KPB</div>
          <div class="text-subtitle1">Penyelenggaraan program KPB dengan pemanfaatan Teknologi Informasi dan Komunikasi untuk memberikan layanan terpadu dan berkesinambungan kepada pengguna KPB</div>
        </div>
      </q-carousel-slide>
      <!-- <q-carousel-slide name="2" img-src="img/carousel/2.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h5">Perikanan</div>
          <div class="text-subtitle1">Salah satu budidaya perairan yang memberikan kontribusi besar bagi produksi sektor perikanan</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="3" img-src="img/carousel/3.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h5">Perkebunan</div>
          <div class="text-subtitle1">Salah satu Komoditi Perkebunan yang memiliki nilai ekonomis yang cukup tinggi dan berperan penting sebagai sumber devisa negara.</div>
        </div>
      </q-carousel-slide> -->
    </q-carousel>
    <q-btn
      :to="{
        name: 'indexLayanan', params: { idRole: $route.params.idRole }
      }"
      class="q-mt-md"
      unelevated
      color="primary"
      icon="arrow_back"
      label="Kembali Ke Menu Layanan"
    />
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      slide: '1',
      autoplay: true
    }
  }
}
</script>
<style lang="sass" scoped>
  .custom-caption
    text-align: center
    padding: 12px
    color: white
    background-color: rgba(0, 0, 0, .3)
</style>
