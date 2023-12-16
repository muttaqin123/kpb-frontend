<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <div class="text-h6">Profil Kios</div>
        <div>Mohon perbaharui data guna menunjang kebutuhan penebusan alokasi subsidi.</div>
        <q-form @submit="updateProfile">
          <q-input
            label="Kode Kios"
            v-model="kodeKios"
            :rules="$defaultValidation"
            :readonly="adaData"
          >
            <template v-slot:hint>
              Contoh : RT0000001
            </template>
          </q-input>
          <q-input
            label="Nama Kios"
            v-model="nama"
            :rules="$defaultValidation"
          />
          <q-select
            :options="listBank"
            v-model="bank"
            label="Pilih Bank"
            option-label="nama_bank"
            option-value="id"
            :rules="$defaultValidation"
          />
          <q-input
            label="Nomor Rekening"
            type="number"
            v-model="nomorRekening"
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
      nomorRekening: null,
      bank: null,
      listBank: [],
      nik: null,
      adaData: false,
      kodeKios: null
    }
  },
  async created () {
    this.nik = this.$getProfile().nik
    await this.getListBank()
    await this.getProfile()
  },
  methods: {
    async getListBank () {
      this.$axios.get('master/bank', this.$createToken())
        .then(res => {
          if (this.$parseResponse(res.data, false)) this.listBank = res.data.result
        })
    },
    async getProfile () {
      this.$showLoading()
      this.$axios.get(`master/pubers-kios/${this.nik}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            const profile = res.data.result
            if (profile) {
              this.adaData = true
              this.nama = profile.nama_kios
              this.nomorRekening = profile.norek_kios
              this.kodeKios = profile.kode_kios
              this.bank = profile.master_bank
            } else {
              this.adaData = false
              this.$notif('Mohon Perbaharui Data Anda', 'negative')
            }
          }
        }).catch(() => this.$commonErrorNotif())
    },
    updateProfile () {
      this.$showLoading()
      this.$axios.post(`master/pubers-kios/${this.nik}`, {
        nama_kios: this.nama,
        norek_kios: this.nomorRekening,
        id_bank: this.bank.id,
        adaData: this.adaData,
        kode_kios: this.kodeKios
      }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, true)) this.getProfile()
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
