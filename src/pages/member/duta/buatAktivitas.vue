<template>
  <q-page style="background: #F3F8FF">
    <div :class="`q-pa-md ${this.$q.screen.xs ? '' : 'q-mx-xl'}`">
      <q-btn label="Kembali" no-caps icon="arrow_back" rounded @click="this.$router.go(-1)"/>
      <div class="q-mt-md column border-shadow q-pa-md">
        <span class="text-h5 text-weight-bold">
          Upload Kegiatan
        </span>
        <span>Isi Semua Komponen Kegiatan Dibawah ini</span>
        <q-form
          @submit="addActivity">
          <div class="q-gutter-sm q-mt-sm">
            <q-input label="Judul Kegiatan" v-model="form.nama_kegiatan" outlined :rules="[ val => val !== '' || 'Masukan Judul Kegiatanya']"/>
            <q-input label="Penyelenggara" v-model="form.penyelenggara" outlined :rules="[ val => val !== '' || 'Masukan Penyelenggara']"/>
            <q-input label="Sebagai" v-model="form.sebagai" outlined :rules="[ val => val !== '' || 'Masukan Anda Sebagai Apa di Kegiatan Tersebut']"/>
            <q-input label="Tanggal Kegiatan" v-model="form.tgl_kegiatan" outlined>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.tgl_kegiatan" :locale="settingMask" mask="dddd, D MMM YYYY">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-file label="Foto Kegiatan" hint="Maximal 5 Foto" max-files="5" multiple v-model="images" outlined :rules="[ val => val !== null || 'Masukan minimal 1 Foto']">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-editor v-model="form.narasi" />
            <q-btn label="Upload Kegiatan" class="q-mt-sm full-width" type="submit" no-caps color="primary"/>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
<script>
import { date } from 'quasar'
// import id from 'quasar/lang/id' // Modul Bahasa Indonesia
export default {
  data () {
    return {
      images: [],
      settingMask: {
        days: 'Minggu_Senin_Selasa_Rabu_Kamis_Jum\'at_Sabtu'.split('_'),
        daysShort: 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
        months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_')
      },
      form: {
        nik: this.$getProfile().nik,
        nama_kegiatan: '',
        penyelenggara: '',
        sebagai: '',
        narasi: '',
        tgl_kegiatan: date.formatDate(Date.now(), 'dddd, DD MMMM YYYY', {
          days: 'Minggu_Senin_Selasa_Rabu_Kamis_Jum\'at_Sabtu'.split('_'),
          daysShort: 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
          months: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
          monthsShort: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_')
        })
      }
    }
  },
  methods: {
    addActivity () {
      this.$showLoading()
      const formData = new FormData()
      this.images.forEach((image) => {
        formData.append('images', image)
      })
      formData.append('data', JSON.stringify(this.form))
      this.$axios.post('/duta/createActivity', formData)
        .finally(() => this.$hide())
        .then((res) => {
          if (res.data.status) {
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
</script>
