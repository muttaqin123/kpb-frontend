<template>
  <q-layout view="lHh Lpr lFf" style="background: #F2F7F5">
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="column">
          <div class="text-center">
            <div class="q-ma-md">
              <q-img
                style="width: 50%"
                src="img/e-kpb.png"></q-img>
            </div>
            <div class="flex flex-center">
              <div class="q-pa-md q-ma-md column box-login bg-white border">
                <div class="column bg-white" v-if="this.$q.screen.xl || this.$q.screen.lg || this.$q.screen.md">
                  <span class="text-h3 text-primary text-weight-bold">Daftar Akun e-KPB</span>
                  <span style="color: #AEAEAE; font-size: 19px" class="q-mb-lg">Daftarkan diri anda untuk menikmati fasilitas e-KPB</span>
                </div>
                <div class="column" v-else>
                  <span class="text-primary text-weight-bold text-h5">Daftar Akun e-KPB</span>
                  <span style="color: #AEAEAE; font-size: 12px" class="q-mb-md">Daftarkan diri anda untuk menikmati fasilitas e-KPB</span>
                </div>
                <q-form @submit="onSubmit" class="q-gutter-md">
                  <q-input
                    v-model="form.nik"
                    label="NIK"
                    stack-label
                    outlined
                    color="primary"
                    :rules="[
                      val => (val.length === 16)|| 'Nik Harus 16 Digit'
                    ]"
                  />
                  <q-input
                    v-model="form.nama"
                    label="Nama"
                    stack-label
                    outlined
                    color="primary"
                    :rules="[
                      val => val !== null || 'Wajib Diisi'
                    ]"
                  />
                  <area-provinsi :outline="true"/>
                  <area-kabupaten :outline="true"/>
                  <area-kecamatan :outline="true"/>
                  <area-desa :outline="true"/>
                  <q-input
                    v-model="form.alamat"
                    label="Alamat"
                    stack-label
                    outlined
                    color="primary"
                    :rules="[
                      val => val !== null || 'Wajib Diisi'
                    ]"
                  />
                  <q-input
                    v-model="form.kode_pos"
                    label="Kode Pos"
                    stack-label
                    outlined
                    color="primary"
                    :rules="[
                      val => val !== null || 'Wajib Diisi'
                    ]"
                  />
                  <q-input
                    v-model="form.no_hp"
                    label="No Hp/No WA"
                    stack-label
                    outlined
                    color="primary"
                    :rules="[
                      val => (val.length >= 11) || 'Wajib Diisi'
                    ]"
                  />
                  <q-input
                    v-model="form.email"
                    label="E-Mail"
                    stack-label
                    outlined
                    color="primary"
                    :rules="[null]"
                  />
                  <q-input
                    v-model="form.tempat_lahir"
                    label="Tempat Lahir"
                    stack-label
                    outlined
                    color="primary"
                    :rules="$defaultValidation"
                  />
                  <q-input @click="$refs.tanggalLahir.show()" outlined  v-model="form.tanggal_lahir" label="Tanggal Lahir" mask="date" :rules="$defaultValidation">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover ref="tanggalLahir" transition-show="scale" transition-hide="scale">
                          <q-date v-model="form.tanggal_lahir" @update:model-value="$refs.tanggalLahir.hide()"/>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <div class="text-left">Jenis Kelamin</div>
                  <div class="q-gutter-sm text-left">
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
                    outlined
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
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
const model = () => {
  return {
    nik: '',
    nama: null,
    id_prov: null,
    id_kab: null,
    id_kec: null,
    id_desa: null,
    alamat: null,
    jenis_kelamin: 'Laki-Laki',
    tanggal_lahir: null,
    tempat_lahir: null,
    no_hp: null,
    email: null,
    password: null,
    kode_pos: null
  }
}
export default {
  data () {
    return {
      isPwd: true,
      form: model(),
      tanggalLahir: null
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
      // this.form.tanggal_lahir = this.tanggalLahir.split('/').join('-')

      this.$showLoading()
      this.$axios.post('auth/sign-up', this.form)
        .finally(() => this.$hide())
        .then(res => {
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
