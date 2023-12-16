<template>
  <q-layout view="lHh lpr lFf">
    <header-page/>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      v-if="this.$route.meta.adaMenu"

      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"

      :breakpoint="500"
      class="bg-white"
      style="box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15); color: #050D33"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <!-- <item-menu :navigation="navigation[this.$route.meta.menu]"/> -->
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="main-page">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import itemMenu from '../components/ItemMenu.vue'
// import logout from '../helper/Logout'
// import listMenu from './menu/Tph'
import headerPage from '../components/Header.vue'
export default {
  components: {
    // itemMenu,
    headerPage
  },
  data () {
    return {
      // logout,
      miniState: true
      // leftDrawerOpen: false,
      // navigation: listMenu
    }
  }
}
</script>
