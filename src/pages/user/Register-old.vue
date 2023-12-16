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
                <span class="text-h3 text-primary text-weight-bold">Registrasi Anggota</span>
                <span style="color: #AEAEAE; font-size: 19px" class="q-mb-lg">Silahkan masukan data sesuai akun KPB</span>
              </div>
              <div class="column" v-else>
                <span class="text-primary text-weight-bold text-h5">Registrasi Anggota</span>
                <span style="color: #AEAEAE; font-size: 12px" class="q-mb-md">Silahkan masukan username dan password</span>
              </div>
              <q-form @submit="onSubmit" class="q-gutter-md">
                <q-input
                  v-model="form.nik"
                  label="NIK"
                  stack-label
                  color="primary"
                  :rules="[
                    val => val !== null || 'Wajib Diisi'
                  ]"
                />
                <q-input
                  v-model="form.nama"
                  label="Nama"
                  stack-label
                  color="primary"
                  :rules="[
                    val => val !== null || 'Wajib Diisi'
                  ]"
                />
                <area-provinsi />
                <area-kabupaten />
                <area-kecamatan />
                <area-desa />
                <q-input
                  v-model="form.alamat"
                  label="Alamat"
                  stack-label
                  color="primary"
                  :rules="[
                    val => val !== null || 'Wajib Diisi'
                  ]"
                />
                <q-input
                  v-model="form.kode_post"
                  label="Kode Post"
                  stack-label
                  color="primary"
                  :rules="[
                    val => val !== null || 'Wajib Diisi'
                  ]"
                />
                <q-input
                  v-model="form.no_hp"
                  label="No Hp/No WA"
                  stack-label
                  color="primary"
                  :rules="[
                    val => val !== null || 'Wajib Diisi'
                  ]"
                />
                <q-input
                  v-model="form.email"
                  label="E-Mail"
                  stack-label
                  color="primary"
                  :rules="[null]"
                />
                <div>Jenis Kelamin</div>
                <div class="q-gutter-sm">
                  <q-radio
                    dense v-model="form.jenis_kelamin"
                    val="Laki-Laki" label="Laki-Laki"
                    :rules="[
                      val => val !== null || 'Wajib Diisi'
                    ]"
                  />
                  <q-radio dense v-model="form.jenis_kelamin" val="Perempuan" label="Perempuan" />
                </div>
                <q-input
                  v-model="form.password"
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
                  <q-btn class="full-width" type="submit" padding="sm xl" color="primary" label="Daftar Sekarang" no-caps/>
                  <q-btn class="full-width q-mt-sm" :to="{name: 'loginPage'}" outline type="submit" padding="sm xl" color="primary" label="Login" no-caps/>
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
const model = () => {
  return {
    nik: null,
    nama: null,
    id_prov: null,
    id_kab: null,
    id_kec: null,
    id_desa: null,
    alamat: null,
    jenis_kelamin: 'Laki-Laki',
    no_hp: null,
    email: null,
    password: null,
    kode_post: null
  }
}
export default {
  data () {
    return {
      isPwd: true,
      form: model()
    }
  },
  created () {
    this.$resetArea()
  },
  methods: {
    onSubmit () {
      this.form.id_prov = this.$store.state.area.provinsi.id
      this.form.id_kab = this.$store.state.area.kabupaten.id
      this.form.id_kec = this.$store.state.area.kecamatan.id
      this.form.id_desa = this.$store.state.area.desa.id

      this.$showLoading()
      this.$axios.post('auth/sign-up', this.form)
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res.data)
          if (this.$parseResponse(res.data)) {
            this.form = model()
            this.$resetArea()
            this.$notif(res.data.message)
            this.$router.push({ name: 'loginPage' })
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
