<template>
  <q-page padding style="background: #F2F7F5">
    <q-btn icon="west" color="green-10" no-caps label="Dashboard" @click="this.$router.go(-1)" outline rounded/>
    <div class="q-mt-lg q-pa-md border-shadow column bg-white">
      <q-form @submit="onSubmit">

        <div class="flex flex-center column">
          <div class="text-h5 text-center text-weight-medium">Bagaimana Kepuasan Anda Dengan Layanan OKKP-D?</div>
          <div class="text-center q-my-md">
            Sebelum Mengupload Blanko Sertifikat Silahkan Isi ulasan anda, <br>
            Ulasan anda akan menjadi masukan untuk pengembangan layanan kami kedepannya
          </div>
        </div>
        <div class="q-mx-md q-my-sm border-shadow text-grey-10 bg-green-3 flex flex-center column q-pa-md">
          <span class="text-weight-medium">1.Layanan di Kantor OKKP-D Provinsi Lampung</span>
          <div class="row q-mt-md">
            <q-radio :disable="isDisable" name="kantor" v-model="form.kantor" val="Sangat Tidak Puas" label="Sangat Tidak Puas" />
            <q-radio :disable="isDisable" name="kantor" v-model="form.kantor" val="Tidak Puas" label="Tidak Puas" />
            <q-radio :disable="isDisable" name="kantor" v-model="form.kantor" val="Puas" label="Puas" />
            <q-radio :disable="isDisable" name="kantor" v-model="form.kantor" val="Sangat Puas" label="Sangat Puas" />
          </div>
        </div>
        <div class="q-mx-md q-my-sm border-shadow text-grey-10 bg-green-3 flex flex-center column q-pa-md">
          <span class="text-weight-medium">2.Layanan Pengambilan contoh di Lokasi</span>
          <div class="row q-mt-md">
            <q-radio :disable="isDisable" name="pengambilan" v-model="form.pengambilan" val="Sangat Tidak Puas" label="Sangat Tidak Puas" />
            <q-radio :disable="isDisable" name="pengambilan" v-model="form.pengambilan" val="Tidak Puas" label="Tidak Puas" />
            <q-radio :disable="isDisable" name="pengambilan" v-model="form.pengambilan" val="Puas" label="Puas" />
            <q-radio :disable="isDisable" name="pengambilan" v-model="form.pengambilan" val="Sangat Puas" label="Sangat Puas" />
          </div>
        </div>
        <div class="q-mx-md q-my-sm border-shadow text-grey-10 bg-green-3 flex flex-center column q-pa-md">
          <span class="text-weight-medium">3.Penanganan Hasil uji laboratorium ulang (jika mengulang)</span>
          <div class="row q-mt-md">
            <q-radio :disable="isDisable" name="penanganan" v-model="form.penanganan" val="Sangat Tidak Puas" label="Sangat Tidak Puas" />
            <q-radio :disable="isDisable" name="penanganan" v-model="form.penanganan" val="Tidak Puas" label="Tidak Puas" />
            <q-radio :disable="isDisable" name="penanganan" v-model="form.penanganan" val="Puas" label="Puas" />
            <q-radio :disable="isDisable" name="penanganan" v-model="form.penanganan" val="Sangat Puas" label="Sangat Puas" />
          </div>
        </div>
        <div class="q-mx-md q-my-sm border-shadow text-grey-10 bg-green-3 flex flex-center column q-pa-md">
          <span class="text-weight-medium">4.Ketepatan Waktu Pelaksanaan pelayanan sertifikasi</span>
          <div class="row q-mt-md">
            <q-radio :disable="isDisable" name="ketepatan" v-model="form.ketepatan" val="Sangat Tidak Puas" label="Sangat Tidak Puas" />
            <q-radio :disable="isDisable" name="ketepatan" v-model="form.ketepatan" val="Tidak Puas" label="Tidak Puas" />
            <q-radio :disable="isDisable" name="ketepatan" v-model="form.ketepatan" val="Puas" label="Puas" />
            <q-radio :disable="isDisable" name="ketepatan" v-model="form.ketepatan" val="Sangat Puas" label="Sangat Puas" />
          </div>
        </div>
        <q-input class="q-ma-md" :disable="isDisable" outlined v-model="form.review" label="Review Anda" type="textarea"/>
        <div v-if="!isDisable" class="column q-ma-md">
          <q-btn type="submit" label="Kirim Review Anda" no-caps color="green-10"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      isDisable: false,
      form: {
        kantor: null,
        pengambilan: null,
        penanganan: null,
        ketepatan: null,
        review: null
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$showLoading()
      this.$axios.get(`okkpd/getRating/${this.$route.params.id}`, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          if (res.data.result.kantor) {
            this.isDisable = true
            this.form = res.data.result
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      if (this.form.kantor === null || this.form.pengambilan === null || this.form.ketepatan === null || this.form.review === null) {
        this.$notif('Form Perlu diisi', 'negative')
      } else {
        this.$showLoading()
        this.$axios.put(`okkpd/addRating/${this.$route.params.idDetail}/${this.$route.params.id}`, this.form, this.$createToken())
          .finally(() => this.$hide())
          .then((res) => {
            if (res.data.status) {
              // console.log(res)
              this.$notif(res.data.message, 'positive')
              this.$router.go(-1)
            } else {
              this.$notif(res.data.message, 'negative')
            }
          })
          .catch(() => this.$commonErrorNotif())
      }
    }
  }
}
</script>
