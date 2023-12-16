<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <div class="text-h6">Profil Poktan</div>
        <div>Mohon perbaharui data guna menunjang kegiatan pertanian dipoktan anda.</div>
        <q-form @submit="updateProfile">
          <q-input
            label="Nama Poktan"
            v-model="nama"
            :rules="$defaultValidation"
          />
          <q-btn
            label="Perbaharui Data"
            unelevated
            color="primary"
            type="submit"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      nama: null,
      nik: null,
      adaData: false
    }
  },
  async created () {
    this.nik = this.$getProfile().nik
    await this.getProfile()
  },
  methods: {
    async getProfile () {
      this.$showLoading()
      this.$axios.get(`master/pubers-poktan/${this.nik}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            const profile = res.data.result
            if (profile) {
              this.adaData = true
              this.nama = profile.nama_poktan
            } else {
              this.adaData = false
              this.$notif('Mohon Perbaharui Data Anda', 'negative')
            }
          }
        }).catch(() => this.$commonErrorNotif())
    },
    updateProfile () {
      this.$showLoading()
      this.$axios.post(`master/pubers-poktan/${this.nik}`, {
        nama_poktan: this.nama,
        adaData: this.adaData
      }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, true)) this.getProfile()
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
