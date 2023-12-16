<template>
  <q-page>
    <div class="q-gutter-sm q-pa-sm row bg-white items-center">
      <q-btn icon="arrow_back" flat dense class="q-mr-sm" @click="this.$router.go(-1)"/>
      <span class="text-h6 text-weight-medium">Edit Profile</span>
    </div>
    <div class="q-pa-md bg-white q-ma-md">
      <q-form @submit="onSubmit">
        <div class="colum q-gutter-sm q-mb-md">
          <div class="" style="background:FFBB16; color: black">
            <span class="text-h6">Informasi Toko</span>
          </div>
          <q-input outlined v-model="nama_toko" label="Nama Toko" />
          <q-input outlined v-model="slogan_toko" label="Slogan Toko" />
          <q-input outlined v-model="deskripsi_toko" type="textarea" label="Deskripsi Toko" />
        </div>
        <div class="colum q-gutter-sm q-my-md">
          <div class="" style="background:FFBB16; color: black">
            <span class="text-h6">Logo Toko</span>
          </div>
          <q-file
            outlined
              v-model="file"
              label="Upload Logo Toko"
              @update:model-value="onFileUploaded"
              accept=".jpg, .jpeg, .png" />
            <span class="q-mt-md text-body1" style="margin-bottom: -10px; color: #2E2E2E">Preview</span>
            <div class="" style="width: 200px; height: 200px; border: 1px solid #aeaeae">
              <q-img
                :src="imageUrl ? imageUrl : `${this.$urlImagePemasaran}/file/api/v1/toko/logo/${dataToko?.toko?.gambar_toko}`"
                width="200px"
                height="200px"
                basic
                flat
                bordered
              />
          </div>
          <div class="colum q-gutter-sm q-mb-md">
            <div class="" style="background:FFBB16; color: black">
              <span class="text-h6">Kontak Toko</span>
            </div>
            <q-input outlined v-model="nomor_whatsapp" label="Nomor Whatsapp" />
            <area-kabupaten
              :auto-load="true"
              outlined
            />
            <q-input outlined v-model="alamat_toko" label="Alamat Toko" />
          </div>
        </div>
        <div class="row q-gutter-sm">
          <q-space/>
          <q-btn label="Batalkan" v-close-popup no-caps outline color="white" text-color="black"/>
          <q-btn label="Update" no-caps type="submit" style="background: #FFBB16; color: black"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      dataToko: null,
      member_pemasaran: this.$q.localStorage.getItem('member_pemasaran'),
      nama_toko: '',
      slogan_toko: '',
      deskripsi_toko: '',
      nomor_whatsapp: '',
      alamat_toko: '',
      file: null,
      imageUrl: null
    }
  },
  created () {
    this.dataToko = this.$q.localStorage.getItem('toko_pemasaran')
    this.nama_toko = this.dataToko.toko?.nama_toko
    this.slogan_toko = this.dataToko.toko?.slogan
    this.deskripsi_toko = this.dataToko.toko?.deskripsi
    this.nomor_whatsapp = this.dataToko.toko?.no_wa
    this.alamat_toko = this.dataToko.toko?.alamat
    // console.log(this.$q.localStorage.getItem('toko_pemasaran'))
  },
  methods: {
    onFileUploaded () {
      this.imageUrl = URL.createObjectURL(this.file)
    },
    onSubmit () {
      const headers = {
        Authorization: `Bearer ${this.member_pemasaran?.token}` // Replace with your authorization token
      }
      this.$showLoading()
      this.$axios.put(`https://api.e-kpb.shop/toko/api/v1/toko/${this.dataToko.toko?.toko_id}`, {
        nama_toko: this.nama_toko,
        domain_toko: this.nama_toko.toLocaleLowerCase().replace(/ /g, '_'),
        slogan: this.slogan_toko,
        alamat: this.alamat_toko,
        deskripsi: this.deskripsi_toko
        // no_wa: this.nomor_whatsapp,
        // kabupaten_id: this.$store.state.area.kabupaten.id
      }, { headers }).finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          this.$notif('Berhasil Merubah', 'positive')
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
