<template>
  <q-page style="background: #F3F8FF; color: #193D78">
    <div :class="`q-pa-md ${this.$q.screen.xs ? '' : 'q-mx-xl'}`">
      <div class="row justify-between q-pa-md">
        <div class="col-auto q-ma-sm q-mt-md">
          <q-btn label="Kembali" rounded color="white" text-color="primary" no-caps icon="arrow_back" @click="this.$router.go(-1)"/>
        </div>
        <div class="col-xs-12 col-md-auto q-mt-md">
          <div class="row text-center justify-center q-gutter-md">
            <q-btn v-if="this.$route.name !== 'detailAktivitasAdmin'" label="Edit" :to="{ name: 'editAktivitas' }" padding="xs lg" rounded color="warning" text-color="#193D78" icon="edit" no-caps/>
            <q-btn label="Hapus" @click="deleteActivities(this.$route.params.id)" padding="xs lg" rounded outline color="negative" icon="delete" no-caps/>
          </div>
        </div>
      </div>
      <div class="column text-center q-gutter-sm">
        <span class="text-h3 text-weight-bold">
          {{ form.nama_kegiatan }}
        </span>
        <span class="text-grey-8 text-subtitle1">Tanggal Upload: {{ this.$parseDate(form.created_at).timeWithDay }}</span>
        <span class="text-grey-8">Tanggal Kegiatan: {{ form.tgl_kegiatan }}</span>
        <span class="text-grey-8">Sebagai: {{ form.sebagai }}</span>
        <span class="text-grey-8">Penyelenggara: {{ form.penyelenggara }}</span>
        <q-carousel
          class="q-mt-md"
          :style="`border-radius: 10px; ${this.$q.screen.xs ? 'height: 400px' : 'height: 600px'}`"
          swipeable
          animated
          autoplay
          v-model="slide"
          thumbnails
          infinite
        >
          <template v-for="(image, i) in form.image" :key="i">
            <q-carousel-slide :name="i" :img-src="`${this.$baseURL}file-duta/${image}`" />
          </template>
        </q-carousel>
        <div class="text-left q-mt-md text-h6 text-weight-regular" v-html="form.narasi"></div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      slide: 0,
      form: {
        nama_kegiatan: 'SOSIALISASI DAN BIMTEK APLIKASI KARTU PETANI BERJAYA BERBASIS ELEKTRONIK(e-KPB) BAGI MAHASISWA DUTA KPB',
        penyelenggara: 'BAPEDDA Prov Lampung',
        sebagai: 'Operator',
        narasi: 'What you see is <b>what</b> you get.',
        tgl_kegiatan: '31 Agustus 2023',
        created_at: '31 Agustus 2023',
        image: []
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$showLoading()
      this.$axios.get(`/duta/getDetail/${this.$route.params.id}`, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          this.form = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    },
    deleteActivities () {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$showLoading()
        this.$axios.delete(`/duta/delete/${this.$route.params.id}`, this.$createToken())
          .finally(() => this.$hide())
          .then((res) => {
            console.log(res)
            this.$router.go(-1)
          })
          .catch(() => this.$commonErrorNotif())
      })
    }
  }
}
</script>
