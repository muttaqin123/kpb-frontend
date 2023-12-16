<template>
  <q-layout view="hHh lpR fff" class="bg-grey-1">
    <q-header elevated class="bg-white text-primary">
      <q-toolbar>
        <q-avatar rounded style="width: 60px">
          <img src="img/logo_simple_kpb.png">
        </q-avatar>

        <q-toolbar-title>
          <div class="column">
            <span class="text-weight-bold" style="font-size: 18px">e-Lelang</span>
            <span style="font-size: 12px">Kartu Petani Berjaya</span>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container class="main-page">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
