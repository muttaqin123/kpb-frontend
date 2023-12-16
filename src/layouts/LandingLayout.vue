<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header Mulai -->
    <q-header style="background: #FFF051;">
      <div class="container q-py-sm">
        <q-toolbar class="row justify-between items-center flex flex-center" >
          <div>
            <img
              src="img/landingpage/KPB-Logo.png"
              :style="`${this.$q.screen.xs ? 'width: 64px; height: 36px;' : 'width: 113px; height: 64px;'}`">
          </div>
          <div v-if="this.$q.screen.xl || this.$q.screen.lg || this.$q.screen.md" class="items-center">
            <q-btn
              size="20px"
              no-caps
              text-color="black"
              flat stretch color="primary"
              label="Beranda"
              :to="{name: 'landingpage'}"
            />
            <q-btn
              size="20px"
              no-caps
              text-color="black"
              flat stretch color="primary"
              label="Layanan"
              :to="{name: 'layanan'}"
            />
            <q-btn
              size="20px"
              no-caps
              text-color="black"
              flat stretch color="primary"
              label="Panduan Aplikasi"
              :to="{name:'panduan'}"
            />
            <q-btn
              size="20px"
              no-caps
              text-color="black"
              flat stretch color="primary"
              label="Laporan"
              :to="{name:'laporan'}"
            />
            <q-btn
              size="20px"
              no-caps
              text-color="black"
              flat stretch color="primary"
              label="Portal Web"
              href="https://kpb.lampungprov.go.id/"
              target="_blank"
            />
          </div>
          <div v-else>
            <q-btn @click="drawer = !drawer" color="black" size="md" icon="menu"/>
          </div>
        </q-toolbar>
      </div>
    </q-header>
    <q-drawer
      v-model="drawer"
      :width="fit"
      side="right"
      :breakpoint="500"
      overlay
      behavior="mobile"
      style="background: #FFF051; color: grey-10">
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              clickable
              v-ripple
              :active="linkSelected === menuItem.to"
              @click="linkSelected = menuItem.to"
              class="itemLanding"
              active-class="itemLandingActive"
              :to="{name:menuItem.to}"
              :href="menuItem.link"
              :target="menuItem.target">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </template>
          <div class="q-mx-md absolute-bottom">
            <q-btn @click="drawer = !drawer" class="full-width q-my-lg q-mx-xm" no-caps color="black" label="Tutup" icon="close" />
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- Footer Mulai -->
    <div style="background-color: #1a1e22">
      <div class="container col">
        <img
        class="q-mt-xl"
        src="img/landingpage/Logo-bg.png"
        style="width: 113px; height: 64px;"/>
        </div>
      <div class="container row wrap justify-start q-py-lg">
        <div class="col-6 col-md-4 col-xs-12">
          <div class="column">
            <div class="text-white text-h4 text-weight-bold text-weight-bold q-mb-lg">
              Kartu Petani Berjaya Berbasis Elektronik (e-KPB)
            </div>
            <div v-for="(footers, i) in footer" :key="i" class="column q-mb-md">
              <div class="row">
                <q-icon :name="footers.icon" color="white" size="md"/>
                <div class="text-white text-h6 q-ml-md">
                  {{ footers.judul }}
                </div>
              </div>
              <div class="text-white body">
                {{ footers.deskripsi }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xs-12">
          <div class="column">
            <div class="text-white text-h6 q-ml-md">
              Link Aplikasi
            </div>
            <div class="text-white text-body1">
              <q-list dense padding>
                <q-item v-for="(links, i) in link" :key="i" clickable v-ripple :href="links.link" target="_blank">
                  <q-item-section>
                    {{ links.judul }}
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-xs-12">
          <div class="column">
            <div class="text-white text-h6">
              Sosial Media
            </div>
            <div class="row">
              <q-btn class="q-ma-sm" v-for="(sosmed, i) in listSosmed" :key="i" round :color="sosmed.color" :icon="sosmed.icon" :href="sosmed.url" target="_blank"/>
            </div>
          </div>
        </div>
    </div>
    </div>
    <div style="background-color: #fff051;">
      <div class="column q-py-sm">
        <div class="col container text-center">
          <div>
            Copyright © 2023 Kartu Petani Berjaya. All Right Reserved
          </div>
        </div>
      </div>
    </div>
    <!-- Footer Selesai -->
  </q-layout>
</template>

<script>
import listitem from '../pages/user/listitem'
const menuList = [
  {
    icon: 'dashboard',
    label: 'Beranda',
    to: 'landingpage'
  },
  {
    icon: 'navigate_next',
    label: 'Layanan',
    to: 'layanan'
  },
  {
    icon: 'navigate_next',
    label: 'Panduan Aplikasi',
    to: 'panduan'
  },
  {
    icon: 'navigate_next',
    label: 'Lapotan Aplikasi',
    to: 'laporan'
  },
  {
    icon: 'navigate_next',
    label: 'Portal Web',
    link: 'https://kpb.lampungprov.go.id/',
    target: '_blank'
  }
]
export default {
  data () {
    return {
      drawer: false,
      menuList,
      linkSelected: 'landingpage',
      listSosmed: listitem.listSosmed,
      footer: [
        {
          icon: 'location_on',
          judul: 'Alamat',
          deskripsi: 'Jl. Way Rarem, Pahoman, Kec. Tlk. Betung Utara, Kota Bandar Lampung, Lampung'
        },
        {
          icon: 'phone',
          judul: 'Telepon',
          deskripsi: '0821-8155-5123'
        },
        {
          icon: 'email',
          judul: 'Email',
          deskripsi: 'e-kpb@lampungprov.go.id'
        }
      ],
      link: [
        {
          img: 'img/landingpage/icon_gudter.svg',
          judul: 'Gudang Ternak',
          deskripsi: 'Informasi usaha peternakan',
          link: 'https://gudter.e-kpb.lampungprov.go.id/'
        },
        {
          img: 'img/landingpage/icon_halmed.svg',
          judul: 'Halo Medic Vet',
          deskripsi: 'Konsultasi Dokter Hewan',
          link: 'https://halmed.e-kpb.lampungprov.go.id/'
        },
        {
          img: 'img/landingpage/icon_pemasaran.svg',
          judul: 'e-Pemasaran',
          deskripsi: 'Pemasaran Hasil Pertanian',
          link: 'https://e-kpb.lampungprov.go.id/pemasaran/dashboard'
        }
        // {
        //   judul: 'e-Market',
        //   link: 'https://e-kpb.shop/'
        // }

      ]
    }
  }
}
</script>
<style lang="sass" scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap")
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap")
.text-h1, .text-h2, .text-h3, .text-h4, .text-h5, .text-h6
  font-family: "Inter", sans-serif

.text-body, .text-body1
  font-family: "Poppins", sans-serif
</style>
