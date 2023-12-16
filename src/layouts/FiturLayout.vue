<template>
  <q-layout view="lHh Lpr fff" class="bg-grey-1">
    <q-header class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="apps"
          class="q-mx-md"
          v-if="$route.meta.adaMenu"
        />
        <div v-if="!leftDrawerOpen" class="text-h6 q-ml-sm text-dark">E-KPB</div>

        <q-space />

        <right-btn>
          <template v-slot:menu>
            <q-item to="/member/profile" exact clickable>
              <q-item-section avatar>
                <q-icon color="primary" name="people" />
              </q-item-section>
              <q-item-section>Biodata</q-item-section>
            </q-item>
          </template>
        </right-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      v-if="$route.meta.adaMenu"
      show-if-above
    >
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar q-mt-md">
          <q-toolbar-title class="column items-center text-center text-blue-grey-14">
            <div class="row">
              <img class="q-pt-md" src="img/e-kpb.png" :height="`${this.$q.screen.xs ? '110' :'110'}`" :width="`${this.$q.screen.xs ? '100' :'100'}`">
              <!-- <img class="q-pl-md" src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"> -->
              <!-- <div class="q-ml-sm q-mt-sm items-center text-bold">E-KPB</div> -->
            </div>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <div class="column col-12 q-pa-sm text-center q-mt-md">
            <div class="text-h6 text-weight-bold">{{ this.$getProfile().nama }} {{ this.nama != '' ? ' / ' + this.nama : '' }}</div>
            <q-separator spaced="sm" inset />
            <div class="text-weight-medium">{{ this.$getProfile().nik }}</div>
          </div>
          <q-item clickable class="GPL__drawer-item" active-class="menu-active" :to="{ name: nameRoute(this.$route.params.idLayanan), params: this.$getParams(this.$route) }">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Home</q-item-label>
            </q-item-section>
          </q-item>
          <template v-for="link in menu" :key="link">
            <q-item clickable class="GPL__drawer-item" v-if="link.fitur.meta === 'gudang-ternak'" active-class="menu-active" :href="link.fitur.route_name">
              <q-item-section avatar>
                <q-icon :name="link.fitur.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.fitur.nama_fitur }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable class="GPL__drawer-item" v-else active-class="menu-active" :to="{name: link.fitur.route_name, params:{ idFitur: link.fitur.id_fitur, ...this.$getParams(this.$route)}}">
              <q-item-section avatar>
                <q-icon :name="link.fitur.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.fitur.nama_fitur }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="main-page">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { listLayananKhusus } from '../pages/member/ListLayananKhusus'
import rightBtn from './component/RightBtn.vue'
import profile from '../helper/Profile'
export default {
  components: {
    rightBtn
  },
  created () {
    // console.log(this.$createToken())
    // console.log(this.$route)
    if (this.$route.params.idLayanan === '16') {
      this.nik = this.$getProfile().nik
      this.getProfile()
    }
  },
  data () {
    return {
      nik: '',
      nama: '',
      leftDrawerOpen: true,
      search: '',
      links1: [
        { icon: 'photo', text: 'Photos' },
        { icon: 'photo_album', text: 'Albums' },
        { icon: 'assistant', text: 'Assistant' },
        { icon: 'people', text: 'Sharing' },
        { icon: 'book', text: 'Photo books' }
      ],
      menu: []
    }
  },
  mounted () {
    // const params = this.$getParams(this.$route)
    if (this.$route.meta.adaMenu) {
      this.$axios.get(`users/fitur/${this.$route.params.idLayanan}`, this.$createToken())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.menu = res.data.result
          }
        })
    }
  },
  methods: {
    profile,
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    getProfile () {
      this.$showLoading()
      this.$axios.get(`master/pubers-poktan/${this.nik}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            const profile = res.data.result
            if (profile) {
              // this.adaData = true
              this.nama = profile.nama_poktan
            } else {
              // this.adaData = false
              this.$notif('Mohon Perbaharui Data Anda', 'negative')
            }
          }
        }).catch(() => this.$commonErrorNotif())
    },
    toProfile () {
      this.$router.go({ name: 'updateProfile' })
    },
    nameRoute (idLayanan) {
      // console.log(idLayanan)
      // if (idLayanan === '12') {
      //   return 'dashboardSertifikasi'
      // } else if (idLayanan === '20') {
      //   return 'dashboardOkkpd'
      // } else if (idLayanan === '24') {
      //   return 'dashboardDuta'
      // } else if (idLayanan === '19') {
      //   return 'dashboardPemasaranUser'
      // } else {
      //   return 'indexFitur'
      // }
      // Mencari index fitur dengan id yang diberikan
      // console.log(listLayananKhusus)
      const indexFitur = listLayananKhusus.findIndex(fitur => fitur.id.toString() === idLayanan.toString())
      // console.log(indexFitur)
      // console.log(indexFitur !== -1 ? listLayananKhusus[indexFitur].value : 'indexFitur')

      // Jika id ditemukan, mengembalikan nilai value, jika tidak, mengembalikan indexFitur
      return indexFitur !== -1 ? listLayananKhusus[indexFitur].value : 'indexFitur'
    }
  }
  // name: 'GooglePhotosLayout',
  // setup () {
  //   const leftDrawerOpen = ref(true)
  //   const search = ref('')
  //   const storage = ref(0.26)
  //   function toggleLeftDrawer () {
  //     leftDrawerOpen.value = !leftDrawerOpen.value
  //   }
  //   return {
  //     leftDrawerOpen,
  //     search,
  //     storage,
  //     links1: [
  //       { icon: 'photo', text: 'Photos' },
  //       { icon: 'photo_album', text: 'Albums' },
  //       { icon: 'assistant', text: 'Assistant' },
  //       { icon: 'people', text: 'Sharing' },
  //       { icon: 'book', text: 'Photo books' }
  //     ],
  //     links2: [
  //       { icon: 'archive', text: 'Archive' },
  //       { icon: 'delete', text: 'Trash' }
  //     ],
  //     links3: [
  //       { icon: 'settings', text: 'Settings' },
  //       { icon: 'help', text: 'Help & Feedback' },
  //       { icon: 'get_app', text: 'App Downloads' }
  //     ],
  //     createMenu: [
  //       { icon: 'photo_album', text: 'Album' },
  //       { icon: 'people', text: 'Shared Album' },
  //       { icon: 'movie', text: 'Movie' },
  //       { icon: 'library_books', text: 'Animation' },
  //       { icon: 'dashboard', text: 'Collage' },
  //       { icon: 'book', text: 'Photo book' }
  //     ],
  //     toggleLeftDrawer
  //   }
  // }
}
</script>
