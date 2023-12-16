<template>
  <q-layout view="lHh Lpr lFf">
    <div class="fixed-top row">
      <q-img style="width: 283.5px" src="img/up.png"/>
      <q-space/>
      <div v-if="this.$q.screen.xl || this.$q.screen.md" class="text-h4 text-weight-bold text-blue-grey-14 q-mr-md">KPB<span class="text-secondary" style="font-size: 6rem">.</span></div>
    </div>
    <div class="fixed-bottom-right">
      <q-img style="width: 344.5px" src="img/down.png"/>
    </div>
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="row full-width q-col-gutter-y-md">
          <div class="col-md-6 col-xs-12 flex flex-center items-center">
            <q-img
              style="width: 50%"
              src="img/e-kpb.png"></q-img>
          </div>
          <div class="col-md-6 col-xs-12">
            <div :class="this.$q.screen.xs ? 'q-pa-md q-mx-md column box-login' : 'q-pa-md q-mx-lg column box-login q-mr-xl'">
              <div class="column" v-if="this.$q.screen.xl || this.$q.screen.md">
                <span class="text-h3 text-primary text-weight-bold">Selamat Datang</span>
                <span style="color: #AEAEAE; font-size: 19px" class="q-mb-lg">Silahkan masukan data sesuai akun KPB</span>
              </div>
              <div class="column" v-else>
                <span class="text-primary text-weight-bold text-h5">Selamat Datang!</span>
                <span style="color: #AEAEAE; font-size: 12px" class="q-mb-md">Silahkan masukan username dan password</span>
              </div>
              <q-form @submit="onSubmit" class="q-gutter-md">
                <q-input
                  v-model="username"
                  label="Username"
                  stack-label
                  color="primary"
                  :rules="[
                    val => val !== null || 'Mohon Isi Username'
                  ]"
                />
                <q-input
                  v-model="password"
                  label="Password"
                  :type="isPwd ? 'password' : 'text'"
                  stack-label
                  color="primary"
                  :rules="[
                    val => val !== null || 'Mohon Isi Password'
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <div class="q-mt-lg">
                  <q-btn class="full-width" type="submit" padding="sm xl" color="primary" label="Masuk" no-caps/>
                  <q-btn class="full-width q-mt-sm" :to="{name: 'registerPage'}" outline type="button" padding="sm xl" color="primary" label="Daftar" no-caps/>
                </div>
              </q-form>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import LoginService from '../../helper/service/LoginService'
export default {
  data () {
    return {
      isPwd: true,
      username: null,
      password: null
      // username: 'adminkpb',
      // password: '12345678'
    }
  },
  methods: {
    onSubmit () {
      this.$showLoading()
      LoginService.login(this.username, this.password)
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            LoginService.goToHome(res.data.result, this.$router)
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
