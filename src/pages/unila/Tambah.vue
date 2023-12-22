<template>
  <q-page style="background: #EFF6F1">
    <div style="background: #32573F; height: 80px"></div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  absolute-top`" style="margin-top: 55px">
      <div class="bg-white q-pa-sm row items-center">
        <q-btn class="q-mx-sm" rounded icon="mdi-arrow-left" @click="this.$router.go(-1)" dense flat/>
        <span v-if="isEdit === false" class="text-bold col">Tambah Artikel</span>
        <span v-if="isEdit === true" class="text-bold col">Rubah Artikel</span>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  q-mt-xl q-mb-md bg-white q-pa-sm q-pt-md`">
      <q-form
          @submit="onSubmit">
          <div class="q-gutter-sm q-mt-sm">
            <div class="q-pa-sm">
              <q-input
              v-model="form.judul"
              outlined
              dense
              label="Judul"></q-input>
            </div>
            <div class="q-pa-sm">
          <q-file
            v-model="form.gambar"
            outlined
            dense
            accept=".pdf, .png, .jpg, .jpeg"
            label="Foto Daun">
              <template v-slot: append>
                <q-icon name="attach_file"/>
              </template>
          </q-file>
        </div>
        <div class="q-pa-sm">

          <q-editor v-model="form.narasi" />
        </div>
        <q-btn
      type="submit"
        class="full-width text-bold"
        style="background: #32573F; color: white"
        label="Upload Artikel">
      </q-btn>          </div>
        </q-form>
        </div>
  </q-page>
</template>

<script>
const model = () => {
  return {
    judul: '',
    gambar: '',
    narasi: ''
  }
}
export default {
  data () {
    return {
      form: model(),
      isEdit: true
    }
  },
  async created () {
    this.getData()
  },
  methods: {
    getData () {
      const pathArray = window.location.pathname.split('/')
      // Assuming the structure is always like /disbun-kabupaten/klinik
      // and you want to get the second segment (index 1, as arrays are zero-indexed)
      this.isEdit = false
      if (pathArray[2] === 'edit') {
        this.isEdit = true
        this.$axios.get(`klinik/artikel/${this.$route.params.id}`)
          .finally(() => { this.loading = false })
          .then(res => {
            if (this.$parseResponse(res.data, false)) {
              this.form = res.data.result
            }
          }).catch(() => this.$commonErrorNotif())
      }
    },
    onSubmit () {
      this.$showLoading()
      const formData = new FormData()

      formData.append('gambar', this.form.gambar)

      formData.append('data', JSON.stringify(this.form))

      if (this.isEdit) {
        this.$axios.put(`klinik/artikel/${this.$route.params.id}`, formData, this.$createToken())
          .finally(() => this.$hide())
          .then((res) => {
            if (res.data.status) {
              this.$notif(res.data.message)
              this.form = model()
              this.data = model()
              this.$router.push({ name: 'unilaDetailArtikel', params: { id: res.data.result.id } })
            } else {
              this.$notif(res.data.message, 'negative')
            }
          })
          .catch(() => this.$commonErrorNotif())
      } else {
        this.$axios.post('klinik/artikel', formData, this.$createToken())
          .finally(() => this.$hide())
          .then((res) => {
            if (res.data.status) {
              this.$notif(res.data.message)
              this.form = model()
              this.data = model()
              this.$router.push({ name: 'unilaDetailArtikel', params: { id: res.data.result.id } })
            } else {
              this.$notif(res.data.message, 'negative')
            }
          })
          .catch(() => this.$commonErrorNotif())
      }
    },
    toDetail (id) {
      this.$router.push({ name: `klinikDetail${this.access}`, params: { id } })
    }
  }
}
</script>
