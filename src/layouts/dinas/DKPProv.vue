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
        />
        <div v-if="!leftDrawerOpen" class="text-h6 q-ml-sm text-dark">E-KPB</div>

        <q-space />

        <right-btn>
        </right-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
    >
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar q-mt-md">
          <q-toolbar-title class="row items-center text-blue-grey-14">
            <img class="q-pl-md" src="img/e-kpb.png" width="70">
            <span class="q-ml-sm text-bold">E-KPB</span>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <my-menu
            v-for="(m, i) in menu"
            :key="i"
            :icon="m.icon"
            :label="m.label"
            :to="m.to"
            :hasChild="m.hasChild"
            :subMenu="m.subMenu"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="main-page">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import menu from '../menu/dinas/DKPProv'
import rightBtn from '../component/RightBtn.vue'
import myMenu from '../component/Menu.vue'
export default {
  components: {
    rightBtn,
    myMenu
  },
  data () {
    return {
      leftDrawerOpen: false,
      search: '',
      menu
    }
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
}
</script>
