<template>
  <q-layout view="hHr lpR ffr">
    <q-header elevated class="text-black bg-white">
      <q-toolbar>
        <div class="text-center">
          <img class="q-ma-xs" src="img/e-kpb.png" width="40">
        </div>
        <q-space/>
        <div v-if="!this.$q.screen.xs" class="row q-gutter-md">
          <template v-for="(menuItem, index) in listBtn" :key="index">
            <q-btn flat dense :label="menuItem.nama_layanan" :href="menuItem.url" target="_blank" no-caps />
          </template>
        </div>
        <q-btn v-else icon="menu" flat @click="drawer = !drawer"/>
        <q-drawer
          v-model="drawer"
          :width="200"
          :breakpoint="500"
          overlay
          side="right"
          bordered
          class="bg-grey-3"
        >
          <q-scroll-area class="fit">
            <q-list>
              <template v-for="(menuItem, index) in listBtn" :key="index">
                <q-item clickable v-ripple type="a" :href="menuItem.url">
                  <q-item-section>
                    <span>{{ menuItem.nama_layanan }}</span>
                  </q-item-section>
                </q-item>
              </template>
            </q-list>
          </q-scroll-area>
        </q-drawer>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="" style="background-color: #FAFAFA">
        <div class="row q-pa-sm justify-between ">
          <div class="col-md-7 flex flex-center">
            <div class="column q-pa-sm">
              <span :class="this.$q.screen.xs ? 'text-h5 text-weight-bold' : 'text-h2 text-weight-bold'" style="color:#024830">Selamat Datang di e-KPB Lampung</span>
              <!-- <span :class="this.$q.screen.xs ? 'q-mt-sm text-weight-light' : 'text-h5 q-mt-md text-h6 text-weight-medium'"> -->
                <span :class="this.$q.screen.xs ? 'q-mt-sm text-weight-light' : 'q-mt-md text-h4 text-weight-thin'">
                “Kartu Petani Berjaya adalah program yang
                menghubungkan semua kepentingan pertanian dengan
                tujuan mencapai kesejahtraan pentani dan semua
                pihak yang terlibat dalam proses pertanian secara
                bersama -sama”
              </span>
              <!-- </span> -->
              <div class="row q-mt-sm q-gutter-md">
                <q-btn
                  color="yellow-8"
                  label="Masuk Akun"
                  no-caps
                  style="border-radius:20px"
                  @click="prompt = true"/>
                <q-btn
                  color="green-8"
                  outline
                  label="Daftar Akun"
                  no-caps
                  style="border-radius:20px"
                  :to="{name: 'registerPage'}"/>
              </div>
            </div>
          </div>
          <div class="col-md-4 flex flex-center">
            <q-img src="img/new-banner.png" style="width:80%"/>
          </div>
        </div>
        <div :class="this.$q.screen.xs || this.$q.screen.sm ? '' : 'q-mt-xl q-mx-xl q-px-xl'">
          <q-carousel
            arrows
            infinite
            autoplay
            animated
            transition-prev="slide-right"
            transition-next="slide-left"
            control-size="lg"
            v-model="slide"
            style="height: 100%;min-height: 120px; background-color: #FAFAFA"
          >
            <q-carousel-slide :name="d" style="padding: 10px;" v-for="d in listImage" :key="d">
              <q-img
                :src="`img-admin/${d}`"
                style="height: 100%; width: 100%; border-radius:10px"
              />
            </q-carousel-slide>
          </q-carousel>
        </div>
        <!-- <container-title
          title="Apa itu e-KPB?"
          subtitle="Pusat pengelolaan Kartu Petani Berjaya"
          classType="text-center column">
          <template v-slot:action>
            <span :class="this.$q.screen.xs ? '' : 'text-h5 q-px-xl q-mx-xl text-weight-light'">
            “Kartu Petani Berjaya adalah program yang menghubungkan semua kepentingan pertanian <br>
            dengan tujuan mencapai kesejahtraan pentani dan semua pihak yang terlibat dalam proses <br>
            pertanian secara bersama -sama”
          </span>
          <span class="text-subtittle1 q-mt-sm text-weight-bold">
            (Peraturan Gubernur Lampung No.9 Tahun 2020)
          </span>
          </template>
        </container-title> -->
        <div class="text-center q-mt-xl">
          <q-img src="img/profile.png" :style="this.$q.screen.xs ? 'width: 40%' :'width: 20%'"/>
        </div>
        <container-title
          title="Program layanan e-KPB"
          subtitle="Berbagai program e-KPB yang dapat membantu produktifitas anda"
          classType="row q-px-md q-col-gutter-x-sm q-col-gutter-y-sm">
          <template v-slot:action>
            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" v-for="m in ListLayanan" :key="m">
              <menu-utama
                :title="m.nama_layanan"
                :deskripsi="m.keterangan"
                labelBtn="Lihat Menu"
                withImage
                :image="`${$baseURL}image/layanan/${m.gambar}`"
                withParam
                :withButton="m.route ? true : false"
                :routeWithParam="{ name: m.route }"
                :withBtnRedirect="m.url ? true : false"
                :url="m.url"
                />
            </div>
          </template>
        </container-title>
        <container-title
          title="Cara menjadi anggota KPB"
          subtitle="Berbagai program e-KPB yang dapat membantu produktifitas anda"
          classType="row q-px-md q-col-gutter-x-sm q-col-gutter-y-sm">
          <template v-slot:action>
            <div
              v-for="(item, index) in listPendaftaran"
              :key="index"
              class="col-md-3 col-sm-6 col-xs-12 q-pa-xs">
              <div class="card-menu q-pa-sm" style="height: 100%">
                <div class="row items-center">
                  <div class="bg-primary text-white q-py-sm q-px-md" style="border-radius: 900px;">{{ index + 1 }}</div>
                  <div class="q-ml-md text-subtitlle1 text-grey-6">{{ item.label }}</div>
                </div>
                <div class="q-mt-sm column text-left">
                  <span class="text-primary text-weight-bold text-h6">{{ item.title }}</span>
                  <span class="q-mt-sm">{{ item.description }}</span>
                </div>
              </div>
            </div>
          </template>
        </container-title>
        <container-title
          title="Cara menjadi anggota KPB"
          subtitle="Petani yang terdaftar dalam e-RDKK secara otomatis adalah anggota KPB"
          classType="column">
          <template v-slot:action>
            <div class="q-mt-md row q-pa-md">
              <div class="col-md-6 col-xs-12 column">
                <span class="text-h5 text-weight-bold">Panduan cara penggunaan website e-KPB</span>
                <span class="text-grey-9 text-h6 text-weight-medium">Tata cara penggunaan website e-KPB berbentuk video dan dapat diunduh dalam bentuk pdf dibawah ini</span>
                <div class="q-pa-md">
                  <!-- <q-btn/> -->
                </div>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-video
                  style="height: 400px"
                  src="https://www.youtube.com/embed/5KQov_HmhsI"
                  class="card-menu"
                />
              </div>
            </div>
          </template>
        </container-title>
        <container-title
          title="Sosial Media"
          subtitle="Penjelasan program e-KPB dan dasar hukumnya">
          <template v-slot:action>
            <div class="q-my-xl">
              <div class="row justify-center">
                <div
                  v-for="(sosmed, i) in listSosmed"
                  :key="i"
                  class="col-lg-2 col-md-3 col-sm-6 col-xs-12 q-pa-sm">
                  <div class="row bg-white q-pa-sm items-center" style="border-radius: 10px">
                    <div class="col-auto q-pa-sm bg-yellow-8 flex flex-center" style="border-radius: 100px; width: 70px; height: 70px">
                      <q-icon :name="sosmed.icon" :color="sosmed.color" size="lg"/>
                    </div>
                    <div class="col-auto column q-ml-sm text-left">
                      <span class="text-body1 text-weight-bold">{{ sosmed.namaSosmed }}</span>
                      <span style="font-size:10px">{{ sosmed.detailSosmed }}</span>
                      <q-btn :href="sosmed.url" target="_blank" label="Hubungi" padding="xs xs" flat no-caps/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </container-title>

        <!-- Dialog Area -->
        <q-dialog v-model="prompt" persistent position="bottom">
          <q-card :style="`width: 350px;${$q.screen.lt.sm ? 'min-width:350px;' : 'min-width: 500px;'}`">
            <q-form @submit="onSubmit">
              <q-card-section class="row items-center">
                <div class="text-h6">Login Akun</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>
              <q-separator />

              <q-card-section class="q-pt-none">
                <q-input
                  v-model="username"
                  label="Username"
                  :rules="[val => !!val || 'Masukan Username']"
                  autofocus
                />
                <q-input
                  :type="isPassword ? 'password' : 'text'"
                  v-model="password" label="Password"
                  :rules="[val => val !== null || 'Masukan Password']"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPassword ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="(isPassword = !isPassword)"
                    />
                  </template>
                </q-input>
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <!-- <q-btn flat label="Batal" v-close-popup /> -->
                <q-btn flat label="Login" type="submit" />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
    <q-footer elevated class="column">
      <div class="q-pa-md bg-yellow-8 text-white">
        <div class="row items-center">
          <q-img src="img/e-kpb.png" width="60px" />
          <div class="column q-ml-md">
            <span class="text-weight-bold text-white">e-KPB</span>
            <span>Kartu Petani Berjaya</span>
          </div>
        </div>
        <div class="row q-pa-sm q-mt-md">
          <q-icon name="place" class="col-auto"/>
          <div class="col q-ml-sm">Jl. Way Rarem, Pahoman, Kec. Tlk. Betung Utara, Kota Bandar Lampung, Lampung</div>
        </div>
      </div>
      <div class="bg-primary text-white text-center text-weight-light">
        <span style="font-size: 10px">Copyright © 2023 Kartu Petani Berjaya. All Right Reserved</span>
      </div>
    </q-footer>
  </q-layout>
</template>
<script>
import ContainerTitle from '../../components/card/ContainerTitle.vue'
import LoginService from '../../helper/service/LoginService'
import listitem from './listitem'
import ListLayanan from './ListLayanan'
export default {
  components: {
    ContainerTitle
  },
  data () {
    return {
      ListLayanan,
      url: null,
      slide: '1.png',
      listImage: listitem.listImage,
      prompt: false,
      username: null,
      password: null,
      listMenu: [],
      isPassword: true,
      drawer: false,
      menuList: [],
      listBtn: [],
      listPendaftaran: listitem.listPendaftaran,
      listSosmed: listitem.listSosmed
    }
  },
  created () {
    window.addEventListener('pageshow', this.clearCacheAndReload)
    this.getLayanan()
  },
  beforeUnmount () {
    window.removeEventListener('pageshow', this.clearCacheAndReload)
  },
  methods: {
    clearCacheAndReload (event) {
      if (event.persisted) {
        // jika jenis navigasi adalah hard refresh
        window.localStorage.clear() // hapus data lokal storage jika perlu
        window.sessionStorage.clear() // hapus data sesi storage jika perlu
        window.location.reload(true) // lakukan hard refresh
      }
    },
    getLayanan () {
      this.$showLoading()
      this.$axios.get('master/get-layanan')
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.listMenu = res.data.result
          }
          for (let i = 0; i < this.listMenu.length; i++) {
            if (this.listMenu[i].url !== null && this.listMenu[i].url !== '' && this.listMenu[i].id_layanan !== 19 && this.listMenu[i].id_layanan !== 23) {
              this.listBtn.push(this.listMenu[i])
            }

            if (this.listMenu[i].id_layanan === 19 || this.listMenu[i].id_layanan === 23) {
              this.listMenu[i].route = this.listMenu[i].url
              this.listMenu[i].url = null
            }
          }
        })
    },
    onSubmit () {
      this.$showLoading()
      LoginService.login(this.username, this.password)
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            if (this.password === '12345678') {
              this.$q.dialog({
                title: 'Password masih default !',
                message: 'masukan password baru',
                prompt: {
                  model: '',
                  type: 'password'
                },
                cancel: true,
                persistent: true
              }).onOk(data => {
                if (data.length > 0) {
                  this.$showLoading()
                  this.$axios.put(`users/change-password/${this.username}`, {
                    password: data
                  }, this.$createToken())
                    .finally(() => this.$hide())
                    .then((res) => {
                      if (res.data.status) {
                        this.$notif(res.data.message, 'positive')
                      }
                    }).catch(() => this.$commonErrorNotif())
                } else {
                  this.$notif('Password Masih Defaul', 'positive')
                }
              })
            }
            LoginService.goToHome(res.data.result, this.$router)
          }
        }).catch(() => {
          this.$commonErrorNotif()
        })
    },
    openDialog () {
      this.drawer = !this.drawer
      this.prompt = !this.prompt
    }
  }
}
</script>
