<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="bg-grey-2">
      <q-page padding>
        <div class="row">
          <div class="col-12">
            <carousel-menu/>
          </div>
        </div>
        <div class="q-mt-md text-h4">
          Selamat Datang Diaplikasi E-KPB Lampung
        </div>
        <div class="row q-mt-md">
          <q-btn
            label="Login Disini"
            color="primary"
            unelevated
            size="lg"
            @click="prompt = true"
          />
          <q-btn
            label="Registrasi"
            color="primary"
            unelevated
            outline
            class="q-ml-md"
            size="lg"
            :to="{name: 'registerPage'}"
          />
        </div>
        <div class="row q-col-gutter-x-sm q-col-gutter-y-sm q-mt-md">
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" v-for="m in listMenu" :key="m">
            <menu-utama
              :title="m.nama_layanan"
              :deskripsi="m.keterangan"
              labelBtn="Lihat Menu"
              withImage
              :image="`${$baseURL}image/layanan/${m.gambar}`"
              withParam
              :routeWithParam="null"
              :withButton="false"
              :withBtnRedirect="m.url ? true : false"
              :url="m.url"
            />
          </div>
          <!-- <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <q-card flat>
              <img src="https://kkp.go.id/an-component/media/upload-gambar-pendukung/BBP2HP/logo%20LSPRO%20-%20Copy.jpg" style="height: 350px;"/>
              <q-card-section>
                <div class="text-h5 text-bold text-primary">
                    <a href="https://ublapps.ubl.ac.id/lspro" target="_blank" style="decoration: none;">
                      LSPro Produk Perikanan
                    </a>
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                Sertifikasi Produk Perikanan Dinas Kelautan Dan Perikanan
              </q-card-section>
              <q-card-section class="q-pt-none">
              </q-card-section>
            </q-card>
          </div> -->
        </div>
        <q-dialog v-model="prompt" persistent position="bottom">
          <q-card :style="`width: 350px;${$q.screen.lt.sm ? 'min-width:350px;' : 'min-width: 500px;'}`">
            <!-- <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" /> -->
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
  </q-layout>
</template>
<script>
import carouselMenu from '../../components/Crousel.vue'
import LoginService from '../../helper/service/LoginService'
export default {
  components: {
    carouselMenu
  },
  data () {
    return {
      prompt: false,
      username: null,
      password: null,
      listMenu: [],
      isPassword: true
    }
  },
  created () {
    this.getLayanan()
  },
  methods: {
    getLayanan () {
      this.$showLoading()
      this.$axios.get('master/get-layanan')
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.listMenu = res.data.result
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
                  type: 'password' // optional
                },
                cancel: true,
                persistent: true
              }).onOk(data => {
                console.log('>>>> OK, received', data)
                this.$showLoading()
                this.$axios.put(`users/change-password/${this.username}`, {
                  password: data
                }, this.$createToken())
                  .finally(() => this.$hide())
                  .then((res) => {
                    console.log(res)
                  }).catch(() => this.$commonErrorNotif())
              })
            }
            LoginService.goToHome(res.data.result, this.$router)
          }
        }).catch(() => {
          this.$commonErrorNotif()
        })
    }
  }
}
</script>
