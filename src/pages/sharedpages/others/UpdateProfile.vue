<template style="background: #F2F7F5">
  <q-page padding>
    <q-btn @click="this.$router.go(-1)" label="Kembali ke menu" icon="arrow_back" no-caps color="green-8"/>
    <div class="flex flex-center q-ma-md">
      <div class="border bg-white q-pa-md column text-center">
        <span class="text-h5 text-weight-bold text-green-10">Ubah Data Diri</span>
        <span>Pastikan data yang anda masukan sudah sesuai</span>
         <q-form
           @submit="onSubmit"
           class="q-gutter-md">
          <q-input
            v-model="form.nik"
            label="NIK"
            stack-label
            readonly
            outlined
            color="primary"
          />
          <q-input
            v-model="form.nama"
            label="Nama"
            stack-label
            readonly
            outlined
            color="primary"
          />
          <q-input
            v-model="form.member.reg_provinces.name"
            label="Provinsi"
            stack-label
            readonly
            outlined
            color="primary"
          />
          <q-input
            v-model="form.member.reg_regencies.name"
            label="Kabupaten"
            stack-label
            readonly
            outlined
            color="primary"
          />
          <q-input
            v-model="form.member.reg_districts.name"
            label="Kecamatan"
            stack-label
            readonly
            outlined
            color="primary"
          />
          <q-input
            v-model="form.member.reg_villages.name"
            label="Kelurahan/Desa/Pekon"
            stack-label
            readonly
            outlined
            color="primary"
          />
          <q-input
            v-model="form.alamat"
            label="Alamat"
            stack-label
            outlined
            color="primary"
          />
          <q-input
            v-model="form.member.kode_pos"
            label="Kode Pos"
            stack-label
            outlined
            color="primary"
          />
          <q-input
            v-model="form.member.no_hp"
            label="No Hp/No WA"
            stack-label
            outlined
            color="primary"
          />
          <q-input
            v-model="form.member.email"
            label="E-Mail"
            stack-label
            outlined
            color="primary"
          />
          <div class="text-left">Jenis Kelamin:
            <span class="text-weight-bold">{{ form.jenis_kelamin }}</span>
          </div>
          <div class="q-mt-lg">
            <q-btn class="full-width" type="submit" padding="sm xl" color="primary" label="Ubah Profile" no-caps/>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
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
    kode_post: null,
    member: {
      reg_provinces: {
        name: null
      },
      reg_regencies: {
        name: null
      },
      reg_districts: {
        name: null
      },
      reg_villages: {
        name: null
      }
    }
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
    this.form = this.$getProfile()
    if (this.form.member.reg_districts === null) {
      this.form.member.reg_districts = {
        name: ''
      }
    }
    if (this.form.member.reg_villages === null) {
      this.form.member.reg_villages = {
        name: ''
      }
    }
    this.$resetArea()
  },
  methods: {
    onSubmit () {
      this.$showLoading()
      this.$axios.put(`users/update-profile/${this.$getProfile().nik}`, this.form, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (res.data.status) {
            this.$q.localStorage.set('datauser', res.data.result)
            this.$router.go(-1)
          }
          // if (this.$parseResponse(res.data)) {
          //   this.form = model()
          //   this.$resetArea()
          //   this.$notif(res.data.message)
          //   this.$router.push({ name: 'loginPage' })
          // }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
