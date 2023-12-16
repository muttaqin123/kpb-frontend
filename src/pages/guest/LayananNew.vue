<template>
  <q-page>
    <!-- herro banner mulai -->
    <div style="background-color: #FFF051">
      <div :class="`container row wrap justify-start items-center content-center ${this.$q.screen.xs ? 'q-py-lg' : 'q-py-xl'}`">
        <!-- <div :class="`${this.$q.screen.xs ? 'col-12' : this.$q.screen.md ? 'col-9' : 'col-6'}`"> -->
        <div class="col-md-6 col-xs-12 q-pa-sm">
          <q-btn v-if="this.$q.screen.xs" :to="{name: 'landingpage'}" class="q-mb-lg" no-caps icon="arrow_back" unelevated rounded size="16px" label="Dashboard" style="background-color: #1a1e22; color: white"/>
          <div class="heading">
            Manfaat Layanan Aplikasi e-KPB
          </div>
          <div :class="`${this.$q.screen.xs ? 'text-body q-mt-md q-mb-md' : 'text-body q-mt-lg'}`">
            Aplikasi e-KPB menyediakan berbagai layanan untuk kebutuhan pertanian, perkebunan, peternakan, kelautan, kehutanan dan banyak lagi. Seluruh layanan di e-KPB tergabung menjadi satu platform aplikasi yang dapat menghubungkan semua kepentingan pertanian.
          </div>
        </div>
        <div class="col-md-6 col-xs-12">
          <q-carousel
            animated
            v-model="slide"
            infinite
            :autoplay="autoplay"
            :style="`width: 100%; height: ${this.$q.screen.xs ? 330 : 280 }px; background-color: #FAFAFA; border-radius:16px`"
          >
            <q-carousel-slide name="1" img-src="img/landingpage/banner-layanan01.png">
            </q-carousel-slide>
            <q-carousel-slide name="2" img-src="img/landingpage/banner-layanan02.png">
            </q-carousel-slide>
            <q-carousel-slide name="3" img-src="img/landingpage/banner-layanan03.png">
            </q-carousel-slide>
            <q-carousel-slide name="4" img-src="img/landingpage/banner-layanan04.png">
            </q-carousel-slide>
            <q-carousel-slide name="5" img-src="img/landingpage/banner-layanan05.png">
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
    </div>
    <!-- herro banner selesai -->
    <!-- jenis layanan mulai -->
    <div style="background-color: #1a1e22">
      <div :class="`${this.$q.screen.xs ? 'container row wrap justify-start items-center content-center q-py-lg' : 'container row wrap justify-start items-center content-center q-py-xl'}`">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-mb-md">
          </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-mb-md">
          <div class="column">
              <div class="flex flex-center"
              style="color: #FF9933;
              font-family: Inter , sans-serif;
              font-size: 24px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              letter-spacing: 0.25px;">
              Kategori Layanan
              </div>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-mb-md">
        </div>
      </div>
    </div>
    <!-- jenis layanan selesai -->
    <!-- layanan mulai -->
    <div style="background-color: #F9F7F0;">
        <div class="col container q-py-lg">
          <div v-if="loading" class="row">
            <q-card
              v-for="n in 15"
              :key="n"
              class="q-mx-sm"
              style="width: 100%">
              <q-skeleton height="300px" square />
              <q-item>

                <q-item-section>
                  <q-item-label>
                    <q-skeleton type="text" height="50px" />
                  </q-item-label>
                  <q-item-label caption>
                    <q-skeleton type="text" />
                    <q-skeleton type="text" />
                  </q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" />
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div v-else class="row">
            <div
              v-for="(layanan, i) in data"
              :key="i"
              class="col-lg-4 col-xs-12 q-pa-sm">
              <q-card class="" flat bordered>
                <q-img :src="`${$baseURL}image/layanan/${layanan.gambar}`">
                  <div class="absolute-full text-subtitle2 flex flex-center">
                  </div>
                </q-img>
                <q-card-section>
                  <div class="row">
                    <div class="col text-h5 text-weight-bold">
                      {{ layanan.nama_layanan }}
                    </div>
                    <div class="col">
                      <q-img :src="`${$baseURL}image/layanan/${layanan.icon}`" class="absolute icon" style="width: 100px; height: 100px"/>
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <div class="text-body1 ellipsis-3-lines">
                    Penebusan Pupuk Bersubsidi sesuai jatah e-ALOKASI Pusat dan Memberikan informasi terkait jatah Pupuk Subsidi secara transparan kepada Petani.
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
    </div>
    <!-- layanan selesai -->
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      drawer: false,
      prompt: false,
      slide: 1,
      data: [],
      autoplay: true
    }
  },
  created () {
    this.getLayanan()
  },
  methods: {
    getLayanan () {
      this.$axios.get('master/get-layanan')
        .then((res) => {
          this.loading = false
          // console.log(res)
          this.data = res.data.result
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

.icon{
  border: 1px solid #000;
  border-radius:16px;
  height: 120px;
  width: 120px;
  top: 0;
  right: 12px;
  transform: translateY(-50%);
}

  .heading {
    color: #1a1e22;
    font-family: "Inter", sans-serif;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.25px;
  }

  .headingcard {
    color: #101820;
    font-family: Inter;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .body {
    font-family: "Poppins", sans-serif;
    color: #1a1e22;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 40px; /* 200% */
    letter-spacing: 0.25px;
  }

  .container {
    margin-left: 300px;
    margin-right: 300px;
  }

  /* xl */
  @media only screen and (max-width: 1920px) {
    .container {
      margin-left: 300px;
      margin-right: 300px;
    }
  }

  /* lg */
  @media only screen and (max-width: 1440px) {
    .container {
      margin-left: 150px;
      margin-right: 150px;
    }

    .heading {
      color: #1a1e22;
      font-family: "Inter", sans-serif;
      font-size: 40px;
      text-align: left;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.25px;
    }
  }

  /* md */
  @media only screen and (max-width: 1024px) {
    .container {
      margin-left: 24px;
      margin-right: 24px;
    }
  }

  /* sm */
  @media only screen and (max-width: 600px) {
    .container {
      margin-left: 24px;
      margin-right: 24px;
    }

    .heading {
      color: #1a1e22;
      font-family: "Inter", sans-serif;
      font-size: 24px;
      text-align: left;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.25px;
    }

    .body {
      font-family: "Poppins", sans-serif;
      color: #1a1e22;
      font-size: 14px;
      text-align: left;
      font-style: normal;
      font-weight: 400;
      line-height: 21px; /* 200% */
      letter-spacing: 0.25px;
    }

    .headingcard {
    color: #101820;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .icon{
  border: 1px solid #000;
  border-radius:16px;
  height: 80px;
  width: 80px;
  top: 0;
  right: 12px;
  transform: translateY(-50%);
}
  }
</style>
