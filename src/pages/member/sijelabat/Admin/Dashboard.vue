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

    <div class="text-blue-grey-14 justify-center row items-start q-gutter-md col-md-10 offset-md-4col-xs-12 q-pb-lg q-pl-md q-pr-md q-pt-sm">
      <div class="row q-col-gutter-sm ">
        <div  v-for="(a, i) in listImage" :key="i"  class="col-md-3 col-sm-12 col-xs-12">
          <q-card square flat style="height: 100%">
            <q-card-section class="text-white" align="center">
              <!--              <q-icon name="add_comment" color="teal" size="50px"></q-icon>-->
              <img :src="a.img" style="height: 70px;">
            </q-card-section>

            <q-card-actions vertical align="center">
              <div class="text-h6">{{ a.total }}</div>
              <div class="text-h6">{{ a.title }}</div>
              <div class="text-subtitle2 text-center q-pa-sm">{{ a.subTitle }}</div>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

  </q-page>
</template>
<script>
export default {
  data () {
    return {
      slide: '1',
      summary: [],
      autoplay: true,
      listImage: [
        {
          img: 'sijelabat/bahanbaku.png',
          title: 'Bahan Baku',
          subTitle: 'Penyedia Bahan Baku Mengumpulkan dan Menyediakan Materi Mentah',
          total: 0
        },
        {
          img: 'sijelabat/produsen.png',
          title: 'Produsen',
          subTitle: 'Produsen Mengolah Bahan Mentah Menjadi Produk Jadi',
          total: 0
        },
        {
          img: 'sijelabat/distributor.png',
          title: 'Distributor',
          subTitle: 'Distributor Mendistribusikan Produk Jadi Ke Berbagai Tempat',
          total: 0
        },
        {
          img: 'sijelabat/kios.png',
          title: 'Kios',
          subTitle: 'Kios Titik Penjualan Langsung Kepada Konsumen (Pembudi Daya).',
          total: 0
        }
      ]
    }
  },
  methods: {
    getSummaryData () {
      this.$showLoading()
      this.$axios.get('sijelabat/admin-sijelabat/dashboard/summary/', this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data)) {
            const data = res.data.result
            const kodeUsahaKeys = ['PUBB', 'PUPN', 'PUDR', 'PUKS']
            kodeUsahaKeys.forEach((key, index) => {
              this.listImage[index].total = data[key] || 0
            })
          }
        }).catch(() => this.$commonErrorNotif())
    }
  },
  created () {
    this.getSummaryData()
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
