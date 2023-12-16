<template>
  <q-layout view="hHh lpR fff" class="bg-grey-1">
    <q-header elevated class="bg-white text-primary">
      <q-toolbar>
        <div class="header row" @click="this.$router.push({ name: 'dashboardPemasaran' })">
          <q-avatar rounded style="width: 60px">
            <img src="img/logo_simple_kpb.png">
          </q-avatar>

          <q-toolbar-title>
            <div class="column">
              <span class="text-weight-bold" style="font-size: 18px">e-PEMASARAN</span>
              <span style="font-size: 12px">Kartu Petani Berjaya</span>
            </div>
          </q-toolbar-title>
        </div>

        <!-- <div class="q-pa-xs" v-if="!this.$q.screen.xs && this.$route.name !== 'katalogPemasaran'">
          <q-form
            @submit="onSubmit">
            <q-input outlined v-model="search" placeholder="Cari di E-Pemasaran" dense>
              <template v-slot:append>
                <q-btn icon="search" type="submit" dense flat color="green-8"/>
              </template>
            </q-input>
          </q-form>
        </div>
        <q-btn v-else-if="this.$route.name !== 'katalogPemasaran'" @click="dialog = !dialog" icon="search" dense color="green-8"/> -->
      </q-toolbar>
    </q-header>
    <q-dialog v-model="dialog" position="top">
      <q-card style="width: 350px">
        <q-card-section class="no-wrap">
          <q-form
            @submit="onSubmit">
            <q-input outlined autofocus v-model="search" placeholder="Cari di E-Pemasaran" dense>
              <template v-slot:append>
                <q-btn icon="search" type="submit" dense flat color="green-8"/>
              </template>
            </q-input>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-page-container class="main-page">
      <router-view />
    </q-page-container>
    <q-footer style="background: #F2F7F5" class="text-green-10">
      <div :class="`row ${this.$q.screen.xs ?  '' : 'q-px-lg q-mx-lg'}`">
        <div class="col-md-6 col-sm-12 q-pa-md">
          <div class="row items-center q-mb-sm">
            <div class="col-auto">
              <q-img src="img/e-kpb.png" style="width: 60px; height: 60px"/>
            </div>
            <div class="col column q-ml-sm">
              <span class="text-weight-bold">e-KPB</span>
              <span>Kartu Petani Berjaya</span>
            </div>
          </div>
          <span class="q-mt-md">Kartu Petani Berjaya Program yang menghubungkan semua kepentingan pertanian dengan tujuan mencapai kesejahteraan petani dan semua pihak yang terlibat dalam proses pertanian secara bersama-sama (Pergub. No.9 Tahun 2020). Dan Penyelenggaraan program KPB dengan pemanfaatan Teknologi Informasi dan Komunikasi untuk memberikan layanan terpadu dan berkesinambungan kepada pengguna KPB.</span>
        </div>
        <div class="col-md-6 col-sm-12 q-px-md">
          <div class="q-ma-sm row item-center">
            <div class="col-auto">
              <q-icon name="location_on" />
            </div>
            <div class="col q-ml-md">
              <span>Jl. Way Rarem, Pahoman, Kec. Tlk. Betung Utara, Kota Bandar Lampung, Lampung</span>
            </div>
          </div>
          <div class="q-ma-sm row item-center">
            <div class="col-auto">
              <q-icon name="phone" />
            </div>
            <div class="col q-ml-md">
              <span>Telepon Call Center 0821-8155-5123</span>
            </div>
          </div>
          <div class="q-ma-sm row item-center">
            <div class="col-auto">
              <q-icon name="email" />
            </div>
            <div class="col q-ml-md">
              <span>e-kpb@lampungprov.go.id</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col bg-green-10 text-center text-white q-pa-sm">
        Copyright © 2023 Kartu Petani Berjaya. All Right Reserved
      </div>
    </q-footer>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      search: ''
    }
  },
  created () {
    // console.log('asdasd')
  },
  methods: {
    onSubmit () {
      console.log('terpanggil')
      this.$router.push({ name: 'katalogPemasaran', params: { id: 'semua', search: this.search } })
    }

  }
}
</script>
<style>
  .header {
    cursor: pointer;
  }
</style>
