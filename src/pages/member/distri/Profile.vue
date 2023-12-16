<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <div class="text-h6">Profil Distributor</div>
        <div>Mohon perbaharui data guna menunjang kebutuhan penebusan alokasi subsidi.</div>
        <q-form @submit="updateProfile">
          <q-input
            label="Kode Distributor"
            v-model="kode_distributor"
            :rules="$defaultValidation"
            :readonly="adaData"
          >
            <!-- <template v-slot:hint>
              Contoh : RT0000001
            </template> -->
          </q-input>
          <q-input
            label="Nama Distributor"
            v-model="nama_distributor"
            :rules="$defaultValidation"
          />
          <q-btn label="Update Profile" type="submit" unelevated color="primary"/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      nama_distributor: null,
      nik: null,
      adaData: false,
      kode_distributor: null
    }
  },
  async created () {
    this.nik = this.$getProfile().nik
    await this.getListBank()
    await this.getProfile()
  },
  methods: {
    async getListBank () {
      // this.$axios.get('master/bank', this.$createToken())
      //   .then(res => {
      //     if (this.$parseResponse(res.data, false)) this.listBank = res.data.result
      //   })
    },
    async getProfile () {
      this.$showLoading()
      this.$axios.get(`master/pubers-distri/${this.nik}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            const profile = res.data.result
            if (profile) {
              this.adaData = true
              this.kode_distributor = profile.kode_distributor
              this.nama_distributor = profile.nama_distributor
            } else {
              this.adaData = false
              this.$notif('Mohon Perbaharui Data Anda', 'negative')
            }
          }
        }).catch(() => this.$commonErrorNotif())
    },
    updateProfile () {
      this.$showLoading()
      this.$axios.put('master/pubers-distri', {
        kode_distributor: this.kode_distributor,
        nama_distributor: this.nama_distributor,
        nik: this.nik
      }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, true)) this.getProfile()
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
