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
          :icon="leftDrawerOpen ? 'close' : 'menu'"
          class="q-mx-md"
          v-if="$route.meta.adaMenu"
        />
        <!-- <q-img src="img/e-kpb.png" width="40px"></q-img> -->
        <div class="text-h6 q-ml-sm text-dark">E-KPB</div>

        <q-space />

        <right-btn>
          <template v-slot:menu v-if="$store.state.verified.verified">
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
    >
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <q-toolbar-title class="row items-center text-grey-8">
            <img class="q-pl-md" src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg">
            <span class="q-ml-sm">Photos</span>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <q-item v-for="link in menu" :key="link" clickable class="GPL__drawer-item">
            <q-item-section avatar>
              <q-icon name="menu" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.fitur.nama_fitur }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="main-page">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import rightBtn from './component/RightBtn.vue'
import profile from '../helper/Profile'
export default {
  components: {
    rightBtn
  },
  data () {
    return {
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
    if (this.$route.meta.adaMenu) {
      this.$axios.get(`users/fitur/${this.$route.params.idLayanan}`)
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.menu = res.data.result
          }
        })
    }
  },
  methods: {
    profile,
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
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
