<template>
  <q-page style="background: #EFF6F1">
    <div style="background: #32573F; height: 80px"></div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  absolute-top`" style="margin-top: 55px">
      <div class="bg-white q-pa-sm row items-center">
        <q-btn class="q-mx-sm col-auto" rounded icon="mdi-arrow-left" @click="this.$router.go(-1)" dense flat/>
        <span class="text-bold col">Artikel</span>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  q-mt-xl q-mb-md`">
      <div class="row">
        <q-card v-for="article in articles" :key="article.id" :style='"margin-bottom: 10px; margin-right:5px"' class='m-2 col-12 col-sm-3'>
        <img src="https://cdn.quasar.dev/img/mountains.jpg">

        <q-card-section>
          <div class="text-h6">{{ article.judul }}</div>
          <div class="text-subtitle2">{{ truncateString(article.narasi, 50)  }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-btn  :href="`fitur/6/34/${idFiturDetailArtikel}/pekebun/artikel/${article.id}`" class="full-width text-bold" style="background: #32573F; color: white; margin-right: 10px;" label="Baca Artikel" />
        </q-card-section>
      </q-card>
    </div>
      <div class="row justify-center" style="margin-top: 50px;">
        <q-pagination
      v-model="currentPage"
      :max="totalPages"
      direction-links
      boundary-links
      @update:model-value="getData"
    />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      current: ref(1)
    }
  },
  data () {
    return {
      idFiturDetailArtikel: null,
      rows: [],
      tanggal: '2023/01/01',
      komoditas: '',
      access: '',
      segment: '',
      loading: false,
      url: '',
      articles: [],
      currentPage: 1,
      pageSize: 8,
      totalItems: 0
    }
  },
  async created () {
    this.getData()
    this.getURLSegment()
  },
  computed: {
    totalPages () {
      return Math.ceil(this.totalItems / this.pageSize)
    }
  },
  methods: {
    getURLSegment () {
      const pathArray = window.location.pathname.split('/')
      // Assuming the structure is always like /disbun-kabupaten/klinik
      // and you want to get the second segment (index 1, as arrays are zero-indexed)
      this.segment = `${pathArray[1]}/${pathArray[2]}`
    },
    async getData () {
      this.loading = true
      this.access = this.$getProfile().member.users_login.access
      const pathArray = window.location.pathname.split('/')[2]
      this.url = pathArray

      this.$axios.get(`users/fitur/${this.$route.params.idLayanan}`, this.$createToken())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.menu = res.data.result
            this.idDetailArtikel = this.menu.find(item => item.fitur.route_name === 'detailKlinikArtikel')

            if (this.idDetailArtikel) {
              this.idFiturDetailArtikel = this.idDetailArtikel.id_fitur
            }
          }
        })

      this.$axios.get('klinik/artikels', {
        params: {
          page: this.currentPage,
          pageSize: this.pageSize
        }
      })
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res, false)) {
            this.articles = res.data.result.articles
            this.totalItems = res.data.result.totalItems
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

<style>
.no-margin-left {
  margin-left: 0 !important;
}
</style>
