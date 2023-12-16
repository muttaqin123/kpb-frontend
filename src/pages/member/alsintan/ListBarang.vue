<template>
  <q-page padding>
    <q-card flat >
      <q-item>
        <q-item-section>
          <q-input style="width: 100%"  @update:model-value="getMaterialMasterMember()" outlined dense v-model="search" color="bg-grey-7 shadow-1" placeholder="cari berdasarkan nama material master">
            <template v-slot:prepend>
              <q-icon v-if="search === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="resetSearch()"/>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
    </q-card>

    <q-card flat v-if="!actionSearch">
      <q-card-section>

        <div class="row">
          <div  class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <q-scroll-area style="height: 388px;">
              <div>
                <q-card flat bordered class="my-card">
                  <q-list bordered separator>
                    <q-item clickable v-ripple  v-for="(a, i) in kabupaten" :key="i">
                      <q-item-section @click="sendKey(a.id)">{{a.name}}</q-item-section>
                    </q-item>
                  </q-list>
<!--                  <img style="padding: 30px" src="alsintan/ecom.jpeg">-->

<!--                  <q-list>-->
<!--                    <q-item clickable>-->
<!--                      <q-item-section avatar>-->
<!--                        <q-icon color="teal" name="local_shipping" />-->
<!--                      </q-item-section>-->

<!--                      <q-item-section>-->
<!--                        <q-item-label>Delivery</q-item-label>-->
<!--                        <q-item-label caption>Pengiriman Aman</q-item-label>-->
<!--                      </q-item-section>-->
<!--                    </q-item>-->

<!--                    <q-item clickable>-->
<!--                      <q-item-section avatar>-->
<!--                        <q-icon color="red" name="autorenew" />-->
<!--                      </q-item-section>-->

<!--                      <q-item-section>-->
<!--                        <q-item-label>Return</q-item-label>-->
<!--                        <q-item-label caption>Jika Barang Memiliki Masalah</q-item-label>-->
<!--                      </q-item-section>-->
<!--                    </q-item>-->

<!--                    <q-item clickable>-->
<!--                      <q-item-section avatar>-->
<!--                        <q-icon color="amber" name="help_center" />-->
<!--                      </q-item-section>-->

<!--                      <q-item-section>-->
<!--                        <q-item-label>24/7 Support</q-item-label>-->
<!--                        <q-item-label caption>Layanan Pengaduan</q-item-label>-->
<!--                      </q-item-section>-->
<!--                    </q-item>-->

<!--                    <q-item clickable>-->
<!--                      <q-item-section avatar>-->
<!--                        <q-icon color="blue" name="payments" />-->
<!--                      </q-item-section>-->

<!--                      <q-item-section>-->
<!--                        <q-item-label>Payment</q-item-label>-->
<!--                        <q-item-label caption>Pembayaran Mudah</q-item-label>-->
<!--                      </q-item-section>-->
<!--                    </q-item>-->
<!--                  </q-list>-->
                </q-card>
              </div>
            </q-scroll-area>
          </div>

          <div v-if="!$q.screen.lt.md" class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
            <div style="padding-left: 10px">
              <q-card flat bordered class="my-card">
               <q-carousel
                arrows
                animated
                :autoplay="autoplay"
                v-model="slide"
                height="388px"
              >
                <q-carousel-slide name="first" img-src="https://lajuroptimal.com/wp-content/uploads/2022/09/yst-seri.jpg">
                  <div class="absolute-bottom custom-caption">
                    <div class="text-h2">Traktor</div>
                    <div class="text-subtitle1">Peralatan</div>
                  </div>
                </q-carousel-slide>
                <q-carousel-slide name="second" img-src="https://image1ws.indotrading.com/s3/productimages/webp/co53999/p431900/w425-h425/03c33fe1-ec29-4e27-87eb-91f0249c71aaw.jpg">
                  <div class="absolute-bottom custom-caption">
                    <div class="text-h2">Traktor</div>
                    <div class="text-subtitle1">Peralatan</div>
                  </div>
                </q-carousel-slide>
                <q-carousel-slide name="third" img-src="https://i0.wp.com/quick.co.id/wp-content/2022/02/detail_8eYiljWrnm.png?quality=50&fit=400,400">
                  <div class="absolute-bottom custom-caption">
                    <div class="text-h2">Traktor</div>
                    <div class="text-subtitle1">Peralatan</div>
                  </div>
                </q-carousel-slide>
              </q-carousel>
              </q-card>
            </div>

          </div>
        </div>
      </q-card-section>
    </q-card>

    <div class="q-pa-md row q-col-gutter-sm " v-if="!actionSearch">
      <div  v-for="(a, i) in listImage" :key="i"  class="col-md-2 col-sm-6 col-xs-6">
        <q-card flat   @click="sendKey(a.key)" v-ripple class="my-box cursor-pointer q-hoverable">
          <q-card-section vertical class="text-gray" align="center">

            <img :src="a.img" style="height: 70px;">
            <div class="text-subtitle2 text-center q-pa-sm">{{ a.subTitle }}</div>
          </q-card-section>

        </q-card>
      </div>
    </div>

    <div v-if="totalSearch" class="row q-col-gutter-sm " style="padding-top: 25px">
      <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12" v-for="data in data" :key="data">
        <q-card class="">
          <q-img :src="data.mm_img != null ? $baseURL+'file-sarpras/'+data.mm_img : 'alsintan/barangsewa/tractorsampel.png'" height="220px">
<!--            <q-chip :class="data.stok_ready > 0 ? 'text-blue absolute-top-right' : 'text-white absolute-top-right'" :color="data.stok_ready > 0 ? 'grey-4' : 'grey-8'" :label="data.stok_ready > 0 ? 'Stok Tersedia:'+ data.stok_ready : 'Stok Habis'"></q-chip>-->
          </q-img>

          <q-card-section>
            <q-btn
              fab
              :color="data.stok_ready > 0 ? 'teal-7' : 'red'"
              :icon="data.stok_ready > 0 ? 'shopping_cart_checkout' : 'remove_shopping_cart'" padding="sm"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
            />
          </q-card-section>

          <q-card-section>
            <div class="text-h6">
              {{ data.mm_nama }}
            </div>
            <div class="text-subtitle1 text-justify q-mt-sm">
              <b>Kategori : </b>{{data.child_dtlk_nama }} <br /> <b>Merk/ Seri : </b>{{data.mm_merk}} <br /> <b>Kontak : </b> <a target="_blank" href="https://api.whatsapp.com/send?phone=6285768763741&text=Halo, Saya ingin menanyakan perihal alsintan">Hubungi Kami</a>
              <br /> <b>Biaya/ Unit: </b>{{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(data.harga) + '/' + data.satuan_harga}}
            </div>
          </q-card-section>
          <q-card-section>
            <div class="col-12">
              <div class="row">
                <div class="col-8">
                  <span class="text-subtitle6 text-left q-mt-sm">{{data.kabupaten}}</span>
                </div>
                <div class="col-4">
                  <span class="text-h6 float-right">
                <q-btn label="Detail" rounded color="secondary" @click="detailBarang(data.mm_id, data.id_stok, data.stok_ready)" outline></q-btn>
              </span>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-card v-if="!totalSearch" class="no-border no-shadow bg-transparent">
      <q-card-section class="flex flex-center q-pa-sm">
        <img v-bind:style="$q.screen.lt.md?{'width': '90%'}:{'width':'35%'}" src="alsintan/404-error.png" alt="">
      </q-card-section>
    </q-card>
    <q-card v-if="totalSearch" class="no-border no-shadow bg-transparent">
      <q-card-section class="flex flex-center q-pa-sm">
        <q-pagination
          v-model="current"
          :max="totalPages"
          input
          input-class="text-orange-10"
          @update:model-value="getMaterialMasterMember()"
        />
      </q-card-section>
    </q-card>
  </q-page>

</template>

<script>
import { ref } from 'vue'
// import { parseProfile } from '../../../boot/Profile'
// const profile = parseProfile()

export default {
  data () {
    const search = ref('')
    return {
      loading: false,
      text: ref(''),
      waktu: null,
      slide: ref('first'),
      autoplay: true,
      search,
      current: 1,
      itemsPerPage: 12,
      resultCount: 0,
      nextPage: null,
      totalPages: 0,
      totalSearch: true,
      actionSearch: false,
      data: [],
      kabupaten: [],
      listImage: [
        {
          img: 'alsintan/barangsewa/traktor2.png',
          subTitle: 'Traktor Roda 2',
          key: 'Traktor Roda Dua'
        },
        {
          img: 'alsintan/barangsewa/traktor4.png',
          subTitle: 'Traktor Roda 4',
          key: 'Traktor Roda Empat'
        },
        {
          img: 'alsintan/barangsewa/pompa.png',
          subTitle: 'Pompa',
          key: 'Pompa'
        },
        {
          img: 'alsintan/barangsewa/transplanter.png',
          subTitle: 'Transplanter',
          key: 'Transplanter'
        },
        {
          img: 'alsintan/barangsewa/cultivator.png',
          subTitle: 'Cultivator',
          key: 'Cultivator'
        },
        {
          img: 'alsintan/barangsewa/combine-harvester.png',
          subTitle: 'Combine',
          key: 'Harvester'
        }
      ],
      listCC: [
        {
          img: 'alsintan/barangsewa/traktor2.png',
          subTitle: 'Pengiriman Aman'
        },
        {
          img: 'alsintan/barangsewa/traktor4.png',
          subTitle: 'Traktor Roda 4'
        }
      ]

    }
  },
  methods: {
    detailBarang (id, idstk, jmlstok) {
      // console.log('cok')
      const ids = btoa(id)
      const idst = btoa(idstk)
      const stokjml = btoa(jmlstok)
      this.$router.push({ name: 'detailBarangAlsintan', params: { id: ids, idstok: idst, jml: stokjml } })
    },
    sendKey (key) {
      this.search = key
      this.getMaterialMasterMember()
    },
    resetSearch () {
      this.search = ''
      this.actionSearch = false
      this.getMaterialMasterMember()
    },
    getKabupaten () {
      this.$axios
        .get('/areas/kabupaten/18')
        .finally(() => this.$hide())
        .then((res) => {
          if (this.$parseResponse(res.data, false)) {
            this.kabupaten = res.data.result
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    getMaterialMasterMember () {
      // this.$showLoading()
      this.$axios.get(`alsintan/material-master/for-member?perpage=${this.itemsPerPage}&page=${this.current}&search=${this.search}`, this.$createToken())
        // .finally(() => this.$hide())
        .then(res => {
          // this.resultCount = res.data.result.length
          // console.log(res)
          // console.log(profile.member.id_kab)
          if (this.search !== '') {
            this.actionSearch = true
          } else {
            this.actionSearch = false
          }
          if (res.data.result.length > 0) {
            this.totalSearch = true
            if (this.$parseResponse(res.data, false)) {
              const paginate = res.data.paginate
              this.resultCount = paginate.rowsNumber
              this.current = paginate.page
              this.itemsPerPage = paginate.rowsPerPage
              this.totalPages = Math.ceil(paginate.rowsNumber / paginate.rowsPerPage)
              this.data = res.data.result
            }
          } else {
            this.totalSearch = false
          }
        }).catch(() => this.$commonErrorNotif())
    }
  },
  created () {
    this.getKabupaten()
    this.getMaterialMasterMember()
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
