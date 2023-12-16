<template>
  <q-page padding style="background: #F2F7F5; color: #024830">
    <div class="q-pa-md column">
      <div class="row">
        <div class="col-xs-12 column">
          <span class="text-h5 text-weight-bold">Data Komoditas</span>
          <span>Data Komoditas yang terdaftar sebagai eksportir</span>
        </div>
        <div class="col-auto q-py-md">
          <q-btn label="Tambah Komoditas" @click="showAdd = !showAdd" icon="add" outline/>
        </div>
      </div>
      <div class="row">
        <div
          v-for="(data, i) in rows"
          :key="i"
          class="col-auto q-pa-sm">
          <div class="q-pa-sm border-shadow column text-grey-9">
            <span class="text-weight-bold text-h6">{{ data.nama_komoditas }}</span>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="showAdd" persistent full-width>
      <div class="q-pa-lg bg-white">
        <div class="column q-gutter-sm">
          <div class="row">
            <div class="col">
              <span class="text-h6">
                Tambah Komoditas
              </span>
            </div>
            <div class="col-auto">
              <q-btn v-close-popup icon="close" flat />
            </div>
          </div>
          <q-form @submit="addKomoditas">
            <q-input
              v-model="komoditas"
              outlined
              label="Nama Komoditas"
              :rules="[
                val => (val !== null && val !== '') || 'Masukan Nama Komoditas'
              ]" />
              <div class="row">
                <q-space/>
                <q-btn type="submit" label="Tambah Komoditas" no-caps color="green-10"/>
              </div>
          </q-form>
        </div>
      </div>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      rows: [],
      showAdd: false,
      komoditas: ''
    }
  },
  created () {
    this.getKomoditas()
  },
  methods: {
    getKomoditas () {
      this.$showLoading()
      this.$axios.get('okkpd/getKomoditas', this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          this.rows = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    },
    addKomoditas () {
      this.$showLoading()
      this.$axios.post('okkpd/createKomoditas', {
        nama_komoditas: this.komoditas
      }, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          if (res.data.status) {
            this.getKomoditas()
            this.showAdd = !this.showAdd
            this.$notif(res.data.message, 'positive')
          } else {
            this.$notif(res.data.message, 'negative')
          }
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
