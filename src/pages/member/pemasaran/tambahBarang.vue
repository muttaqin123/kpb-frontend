<template>
  <q-page padding>
    <div class="q-gutter-sm q-pa-sm row bg-white items-center">
      <q-btn icon="arrow_back" flat dense class="q-mr-sm" @click="this.$router.go(-1)"/>
      <span class="text-h6 text-weight-medium">Tambah Barang</span>
    </div>
    <div class="q-pa-md bg-white q-mt-sm">
      <q-form
        @submit="onSubmit">
        <span class="text-h6">Kategori</span>
        <div class="row">
          <div class="col-md-3 col-sm-6 col-xs-12 q-pa-sm">
            <q-select
              outlined
              v-model="etalase"
              :options="masterEtalase"
              option-label="nama_etalase"
              option-value="etalase_id"
              emit-value
              map-options
              label="Etalase"
              :rules="[
                val => (val != '')|| 'Pilih Etalase'
              ]"
            />
          </div>
          <div class="col-md-3 col-sm-6 col-xs-12 q-pa-sm">
            <q-select
              outlined
              v-model="kategori"
              :options="masterKategori"
              @update:model-value="getSubKategori"
              option-label="nama_kategori"
              option-value="master_kategori_id"
              emit-value
              map-options
              label="Kategori"
              :rules="[
                val => (val != '')|| 'Pilih Kategori'
              ]"
              />
          </div>
          <div class="col-md-3 col-sm-6 col-xs-12 q-pa-sm">
            <q-select
              outlined
              v-model="subKategori"
              :options="masterSubKategori"
              option-label="nama_sub_kategori"
              option-value="master_sub_kategori_id"
              @update:model-value="getChildKategori"
              emit-value
              map-options
              label="Sub Kategori"
              :rules="[
                val => (val != '')|| 'Pilih Sub Kategori'
              ]"
              />
          </div>
          <div class="col-md-3 col-sm-6 col-xs-12 q-pa-sm">
            <q-select
              outlined
              v-model="childKategori"
              :options="masterChildKategori"
              option-label="nama_child_kategori"
              option-value="master_child_kategori_id"
              emit-value
              map-options
              label="Child Kategori"
              :rules="[
                val => (val != '')|| 'Pilih Child Kategori'
              ]"
            />
          </div>
        </div>
        <span class="text-h6 q-mt-sm">Informasi Produk</span>
        <div class="q-pa-sm">
          <q-input
            label="Nama Produk"
            v-model="nama_produk"
            outlined
            :rules="[
              val => (val != '')|| 'Masukan Nama Produk'
            ]"/>
          <div class="row">
            <div class="q-pa-sm col-md-6 col-sm-12 col-xs-12">
              <q-input
                label="Harga Produk"
                v-model="harga_satuan"
                outlined
                prefix="Rp."
                input-class="text-right"
                type="number"
                :rules="[
                  val => (val != '')|| 'Masukan Harga Produk'
                ]"/>
            </div>
            <div class="q-pa-sm col-md-6 col-sm-12 col-xs-12">
              <q-select
                label="Kondisi Produk"
                :options="option_kondisi"
                v-model="kondisi"
                outlined
                :rules="[
                  val => (val != '')|| 'Pilih Kondisi Produk'
                ]"/>
            </div>
          </div>
          <div class="row">
            <div class="q-pa-sm col-md-6 col-sm-12 col-xs-12">
              <q-input
                label="Min. Pembelian"
                v-model="minPembelian"
                outlined
                type="number"
                :rules="[
                  val => (val > 0)|| 'Masukan Max Pembelian Produk'
                ]"/>
            </div>
            <div class="q-pa-sm col-md-6 col-sm-12 col-xs-12">
              <q-input
                label="Max. Pembelian"
                v-model="maxPembelian"
                outlined
                type="number"
                :rules="[
                  val => (val > 0)|| 'Masukan Min Pembelian Produk'
                ]"/>
            </div>
          </div>
          <q-input
            type="textarea"
            outlined
            label="Deskripsi Produk"
            v-model="deskripsi"
            :rules="[
              val => (val != '')|| 'Masukan Deskripsi Produk'
            ]"/>
        </div>
        <span class="text-h6 q-mt-sm">Foto Produk</span>
        <div class="q-mt-md">
          <q-btn label="Tambah Foto" @click="addImageField" no-caps style="background: #FFBB16; color: black"/>
          <div class="q-my-sm" v-for="(image, index) in images" :key="index">
            <div class="col-12 q-pa-sm">
              <div class="row">
                <div class="col-8">
                  <div class="row">
                    <q-file
                      class="col"
                      outlined
                      v-model="image.file"
                      label="Upload gambar"
                      @update:model-value="onFileUploaded(index)"
                      @add="addImageField"
                      accept=".jpg, .jpeg, .png" />
                    <q-btn class="q-ma-sm col-auto" flat dense color="negative" icon="delete" @click="removeImageField(index)" />
                  </div>
                  <span class="q-mt-md text-body1" style="margin-bottom: -10px; color: #2E2E2E">Preview</span>
                  <div class="" style="width: 200px; height: 200px; border: 1px solid #aeaeae">
                    <q-img
                      v-if="image.url"
                      :src="image.url"
                      width="200px"
                      height="200px"
                      basic
                      flat
                      bordered
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span class="text-h6 q-mt-sm">Spesifikasi Produk</span>
        <div class="q-mt-md">
          <q-btn label="Tambah Spesifikasi" @click="poupSpec = !poupSpec" no-caps style="background: #FFBB16; color: black"/>
          <q-list class="q-ma-sm" bordered separator>
            <q-item>
              <q-item-section avatar>Nama Spesifikasi</q-item-section>
              <q-item-section>Tetapan Spesifikasi</q-item-section>
              <q-item-section side>
                Aksi
              </q-item-section>
            </q-item>
            <template
              v-for="(spec, i) in specs"
              :key="i">
              <q-item>
                <q-item-section avatar>{{ spec.nama_spesifikasi }}</q-item-section>
                <q-item-section>{{ spec.tetapan_spesifikasi }}</q-item-section>
                <q-item-section side>
                  <div class="row q-gutter-xs">
                    <q-btn label="Hapus" @click="deleteSpec(i)" no-caps flat dense color="negative"/>
                  </div>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </div>
        <div class="row q-gutter-sm">
          <q-space/>
          <q-btn no-caps label="Batalkan" outline color="white" text-color="black"/>
          <q-btn no-caps type="submit" label="Tambah Produk" style="background: #FFBB16; color: black"/>
        </div>
      </q-form>
      <q-dialog v-model="poupSpec" persistent>
        <div class="q-pa-md column bg-white" style="width: 90%">
          <span class="text-h5 q-my-md">Tambah Spesifikasi</span>
          <q-form @submit="addSpec" class="q-gutter-sm">
            <q-input
              outlined
              v-model="spec.nama"
              label="Nama Spesifikasi"
              :rules="[
                val => (val != '')|| 'Masukan Nama Spesifikasi'
              ]"/>
            <q-input
              outlined
              v-model="spec.tetapan"
              label="Tetapan Spesifikasi"
              :rules="[
                val => (val != '')|| 'Masukan Tetapan Spesifikasi'
              ]"/>
            <div class="row q-gutter-sm">
              <q-space/>
              <q-btn label="Batalkan" v-close-popup no-caps outline color="white" text-color="black"/>
              <q-btn label="Tambah" no-caps type="submit" style="background: #FFBB16; color: black"/>
            </div>
          </q-form>
        </div>
      </q-dialog>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      member_pemasaran: this.$q.localStorage.getItem('member_pemasaran'),
      poupSpec: false,
      spec: {
        nama: '',
        tetapan: ''
      },
      option_kondisi: ['BARU', 'BEKAS'],
      dataToko: this.$q.localStorage.getItem('toko_pemasaran'),
      masterEtalase: [],
      masterKategori: [],
      masterSubKategori: [],
      masterChildKategori: [],
      etalase: '',
      kategori: '',
      subKategori: '',
      childKategori: '',
      deskripsi: '',
      kondisi: '',
      harga_satuan: '',
      nama_produk: '',
      minPembelian: 0,
      maxPembelian: 0,
      modelPhotos: [],
      specs: [],
      images: []
    }
  },
  created () {
    this.getEtalase()
    this.getKategori()
  },
  methods: {
    getEtalase () {
      this.$showLoading()
      this.$api.get('produk/etalase/get-pagination', {
        params: {
          tokoId: this.dataToko.toko.toko_id,
          page: 0,
          size: 1000000000
        }
      }).finally(() => this.$hide)
        .then((res) => {
          // console.log(res)
          this.masterEtalase = res.data.content
        }).catch(() => this.$commonErrorNotif())
    },
    getKategori () {
      this.$showLoading()
      this.$api.get('produk/kategori/list')
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          this.masterKategori = res.data
          // console.log(this.masterKategori)
        })
        .catch(() => this.$commonErrorNotif())
    },
    getSubKategori (val) {
      this.subKategori = null
      this.childKategori = null
      this.masterSubKategori = this.masterKategori.filter((kategori) => kategori.master_kategori_id === val)
      this.masterSubKategori = this.masterSubKategori[0].sub_kategori
    },
    getChildKategori (val) {
      this.childKategori = null
      this.masterChildKategori = this.masterSubKategori.filter((subKategori) => subKategori.master_sub_kategori_id === val)
      this.masterChildKategori = this.masterChildKategori[0].child_kategori
    },
    addImageField () {
      this.images.push({ file: null, url: '' })
      console.log(this.images)
    },
    onFileUploaded (index) {
      this.images[index].url = URL.createObjectURL(this.images[index].file)
    },
    removeImageField (index) {
      this.images.splice(index, 1)
    },
    addSpec () {
      this.specs.push({
        nama_spesifikasi: this.spec.nama,
        tetapan_spesifikasi: this.spec.tetapan
      })
      this.poupSpec = !this.poupSpec
      this.spec = {
        nama: '',
        tetapan: ''
      }
    },
    deleteSpec (index) {
      this.specs.splice(index, 1)
    },
    async onSubmit () {
      this.$showLoading()
      console.log(this.member_pemasaran?.token)
      // this.$showLoading()
      const headers = {
        Authorization: `Bearer ${this.member_pemasaran?.token}` // Replace with your authorization token
      }
      const form = {
        master_child_kategori_id: this.childKategori,
        etalase_id: this.etalase,
        nama_produk: this.nama_produk,
        deskripsi: this.deskripsi,
        kondisi: this.kondisi,
        spesifikasi: this.specs,
        panjang: 0.0,
        lebar: 0.0,
        tinggi: 0.0,
        minimum_pesanan: Number(this.minPembelian),
        maksimum_pesanan: Number(this.maxPembelian),
        harga_satuan: Number(this.harga_satuan)
      }
      let dataProduk = null
      await this.$axios.post('https://api.e-kpb.shop/produk/api/v1/produk/api', form, { headers })
        .finally(() => this.$hide())
        .then((res) => {
          console.log(res)
          dataProduk = res.data
        }).catch(() => this.$commonErrorNotif())
      for (const image of this.images) {
        const formData = new FormData()
        formData.append('image', image.file)
        formData.append('produkId', dataProduk.produk_id)
        await this.$axios.post('https://api.e-kpb.shop/file/api/v1/produk/foto', formData, { headers })
          .finally(() => this.$hide())
          .then((res) => {
            console.log(res)
            this.$q.notify({
              color: 'white',
              textColor: 'primary',
              message: 'Produk Anda Dalam Pemeriksaan Admin \n Mohon ditunggu',
              position: 'center',
              timeout: 4000
            })
            this.$router.go(-1)
          }).catch(() => this.$commonErrorNotif())
      }
    }
  }
}
</script>
