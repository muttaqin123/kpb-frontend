<template>
  <q-page padding>
    <div class="">
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
        <!-- <q-carousel-slide :name="1" img-src="~assets/img/1.png" />
        <q-carousel-slide :name="2" img-src="~assets/img/2.png" />
        <q-carousel-slide :name="3" img-src="~assets/img/3.png" />
        <q-carousel-slide :name="4" img-src="~assets/img/4.png" />
        <q-carousel-slide :name="5" img-src="~assets/img/5.png" /> -->
        <q-carousel-slide :name="d" style="padding: 10px;" v-for="d in listImage" :key="d">
          <q-img
            :src="`img-admin/${d}`"
            style="height: 100%;"
          />
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="q-mt-md text-center">
      <div class="text-h5 text-weight-bold">
        Dashboard Super Admin
      </div>
      <div class="text-subtittle text-grey-8">
        Pusat pengelolaan Kartu Petani Berjaya
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      slide: '1.png',
      listImage: [
        '1.png',
        '2.png',
        '3.png',
        '4.png',
        '5.png'
      ]
    }
  }
}
</script>
