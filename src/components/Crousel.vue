<template>
    <q-carousel
      arrows
      infinite
      autoplay
      animated
      control-text-color="primary"
      control-color="primary"
      control-type="flat"
      transition-prev="slide-right"
      transition-next="slide-left"
      control-size="lg"
      v-model="slide"
      style="height: 100%;min-height: 120px;"
    >
    <!-- style="height: 100%;min-height: 150px;" -->
      <q-carousel-slide :name="d" style="padding: 0px;" v-for="d in listImage" :key="d">
        <q-img
          :src="`img/carousel/${d}`"
          style="height: 100%;"
        />
      </q-carousel-slide>
      <!-- <q-carousel-slide name="1" img-src="img/carousel/pertanian b.jpg">
      </q-carousel-slide>
      <q-carousel-slide name="2" img-src="img/carousel/KELAUTAN DAPERIKANAN PAK GUBERNUR.jpg">
      </q-carousel-slide>
      <q-carousel-slide name="3" img-src="img/carousel/kehutanan.jpg">
      </q-carousel-slide>
      <q-carousel-slide name="4" img-src="img/carousel/perkebunan.jpg">
      </q-carousel-slide>
      <q-carousel-slide name="5" img-src="img/carousel/peternakan c.jpg">
      </q-carousel-slide> -->
      <!-- <q-carousel-slide name="3" img-src="img/carousel/1.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h5">Selamat Datang Di E-KPB</div>
          <div class="text-subtitle1">Penyelenggaraan program KPB dengan pemanfaatan Teknologi Informasi dan Komunikasi untuk memberikan layanan terpadu dan berkesinambungan kepada pengguna KPB</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="4" img-src="img/carousel/2.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h5">Perikanan</div>
          <div class="text-subtitle1">Salah satu budidaya perairan yang memberikan kontribusi besar bagi produksi sektor perikanan</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="5" img-src="img/carousel/3.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h5">Perkebunan</div>
          <div class="text-subtitle1">Salah satu Komoditi Perkebunan yang memiliki nilai ekonomis yang cukup tinggi dan berperan penting sebagai sumber devisa negara.</div>
        </div>
      </q-carousel-slide> -->
    </q-carousel>
</template>
<script>
const first = 'pertanian fix.jpg'
export default {
  data () {
    return {
      slide: first,
      listImage: [
        first,
        'pekerbunan fix.jpg',
        'peternakan fix.jpg',
        'kelautan dan perinakan fix.jpg',
        'kehutanan fix.jpg'
      ]
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
