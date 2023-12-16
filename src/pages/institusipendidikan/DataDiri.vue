<template>
  <q-page padding>
    <div class="bg-white q-pa-xl column">
      <div class="text-center text-h5 text-weight-bold">
        Edit Data Diri Universitas
      </div>
      <q-form
        @submit="onSubmit">
        <div class="q-gutter-md">
          <div class="row items-center flex flex-center">
            <q-avatar size="150px">
              <img :src="imageUrl">
            </q-avatar>
            <q-file
              outlined
              class="q-ml-md"
              style="width: 60%"
              v-model="image"
              label="Input Logo Universitas" />
          </div>
          <q-input outlined label="Masukan Nama Institusi" v-model="form.nama_institusi"/>
          <q-input outlined label="Masukan Nama Ketua Institusi" v-model="form.ketua_institusi"/>
          <q-input outlined label="Masukan Alamat Institusi" v-model="form.alamat"/>
          <q-input outlined label="Masukan Keterangan" v-model="form.keterangan"/>
          <div class="row">
            <q-space/>
            <q-btn type="submit" color="primary" label="Submit" padding="sm xl" no-caps/>
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      image: null,
      imageUrl: 'https://img.freepik.com/premium-vector/school-building-icon-flat-style-college-education-vector-illustration_652240-2206.jpg?w=2000',
      form: {
        nama_institusi: '',
        ketua_institusi: '',
        keterangan: '',
        alamat: '',
        member_id: this.$getProfile().member.id_member,
        status: 0
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    onSubmit () {
      this.$showLoading()
      const formData = new FormData()
      formData.append('data', JSON.stringify(this.form))
      formData.append('image', this.image)
      this.$axios.post('beasiswa/createUniv', formData, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          if (res.data.status) {
            this.$notif(res.data.message, 'positive')
            this.image = null
            this.getData()
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    getData () {
      this.$showLoading()
      this.$axios.get(`beasiswa/getUnivMember/${this.$getProfile().member.id_member}`, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          if (res.data.result) {
            this.form = res.data.result
            this.imageUrl = this.form.logo.length > 0 ? `${this.$baseURL}file-universitas/${this.form.logo}` : 'https://img.freepik.com/premium-vector/school-building-icon-flat-style-college-education-vector-illustration_652240-2206.jpg?w=2000'
          }
          this.$notif(res.data.message, 'positive')
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
