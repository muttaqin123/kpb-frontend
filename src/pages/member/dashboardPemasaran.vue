<template>
  <q-page style="background: #F2F7F5">
    <div class="" v-if="this.notFoundStore">
      <div class="row">
        <div class="col-md-6 col-sm-12 col-xs-12 flex flex-center" style="background: #FFBB16; height: 93.35vh">
          <div class="column">
            <div class="q-py-md">
              <!-- <img src="img/e-kpb.png" alt="logo e-kpb" style="width: 100px; height: 100px"> -->
              <q-btn label="Kembali" icon="chevron_left" style="background: white; color: #212121" no-caps @click="this.$router.go(-1)"/>
            </div>
            <span class="q-py-sm text-h3 text-weight-medium">Selamat Datang Di <br> e-Pemasaran </span>
            <div class="row q-py-md">
              <div class="col-1 q-mr-sm" style="width: 3px; height: 60px; background: black"></div>
              <div class="col column">
                <span>
                  Mulai berdagang di layanan pemasaran e-KPB, <br> Nikmati berbagai keuntungan dengan menjangkau <br> berbagai lapisan konsumen
                </span>
                <q-btn v-if="this.$q.screen.xs || this.$q.screen.sm" class="q-mt-md" style="background: white; color: #212121" label="Daftarkan Toko Anda" @click="scrollToComponent" no-caps/>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12 flex flex-center" style="background: white; height: 93.35vh">
          <div class="column bg-white">
            <div class="q-pa-sm text-h4 q-mx-md text-weight-medium q-mt-md" id="myComponent">Masukan Data Toko</div>
              <q-stepper
                v-model="step"
                ref="stepper"
                class="stepper"
                flat
                contracted
                active-color="yellow-10"
                done-color="yellow-10"
                animated
              >
                <q-step
                  :name="1"
                  title=""
                  icon="settings"
                  :done="step > 1"
                >
                <div class="column col-12 q-gutter-md">
                  <q-input outlined v-model="nama_toko" label="Nama Toko" />
                  <q-input outlined v-model="slogan_toko" label="Slogan Toko" />
                  <q-input outlined v-model="deskripsi_toko" label="Deskripsi Toko" />
                </div>
                </q-step>

                <q-step
                  :name="2"
                  title=""
                  icon="store"
                  :done="step > 2"
                >
                <div class="column col-12 q-gutter-md">
                  <q-file
                    outlined
                    v-model="file"
                    label="Upload Logo Toko"
                    @update:model-value="onFileUploaded"
                    accept=".jpg, .jpeg, .png" />
                  <span class="q-mt-md text-body1" style="margin-bottom: -10px; color: #2E2E2E">Preview</span>
                  <div class="" style="width: 200px; height: 200px; border: 1px solid #aeaeae">
                    <q-img
                      v-if="imageUrl"
                      :src="imageUrl"
                      width="200px"
                      height="200px"
                      basic
                      flat
                      bordered
                    />
                  </div>
                </div>
                </q-step>

                <q-step
                  :name="3"
                  title=""
                  icon="store"
                  :done="step > 3"
                >
                <div class="column col-12 q-gutter-md">
                  <q-file
                    outlined
                    v-model="file_banner"
                    label="Upload banner Toko"
                    @update:model-value="onFileUploadedBanner"
                    accept=".jpg, .jpeg, .png" />
                  <span class="q-mt-md text-body1" style="margin-bottom: -10px; color: #2E2E2E">Preview</span>
                  <div class="" style="width: 200px; height: 200px; border: 1px solid #aeaeae">
                    <q-img
                      v-if="imageUrlBanner"
                      :src="imageUrlBanner"
                      width="600px"
                      height="200px"
                      basic
                      flat
                      bordered
                    />
                  </div>
                </div>
                </q-step>

                <q-step
                  :name="4"
                  title=""
                  icon="assignment"
                >
                <div class="column col-12 q-gutter-md">
                  <q-input outlined v-model="nomor_whatsapp" label="Nomor Whatsapp" />
                  <area-kabupaten
                    :auto-load="true"
                    outlined
                  />
                  <q-input outlined v-model="alamat_toko" label="Alamat Toko" />
                </div>
                </q-step>

                <template v-slot:navigation>
                  <q-stepper-navigation>
                    <div class="row q-gutter-sm justify-end">
                      <q-btn v-if="step > 1" outline no-caps color="primary" @click="$refs.stepper.previous()" label="Sebelumnya" class="q-ml-sm" />
                      <q-btn @click="step === 4 ? createToko() : $refs.stepper.next()" no-caps style="background: #FFBB16; color: black" :label="step === 4 ? 'Daftarkan' : 'Berikutnya'" />
                    </div>
                  </q-stepper-navigation>
                </template>
              </q-stepper>
          </div>
        </div>
          <div class="fixed-bottom-right q-pa-md">
            <q-btn
              v-if="showScrollToTopButton"
              @click="scrollToTop"
              class="scroll-to-top-button"
              icon="arrow_upward"
              color="yellow-10"
              fab-mini
            />
          </div>
        <!-- <div class="fixed-botton-right" :scroll-offset="150" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="accent" />
        </div> -->
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-pa-sm' : 'q-pa-xl' }`" v-else>
      <q-btn label="Kembali" icon="chevron_left" class="q-mb-xl" style="background: white; color: #212121; border-radius: 30px" no-caps @click="this.$router.push({ name: 'indexLayanan'})"/>
      <div class="row items-center justify-between q-ma-sm q-pa-md q-mb-lg" style="background: #FFBB16; borderRadius: 10px">
        <div class="col-md-9 col-sm-12 column ">
          <span class="text-body1">Selamat Datang Di e-Pemasaran</span>
          <span class="text-h5 text-weight-bold">Kartu Petani Berjaya Berbasis <br> Elektronik (e-KPB)</span>
        </div>
        <div class="col-md-3">
          <img src="img/pemasaran/pesanan.png" alt="img_pesanan" style="width: 100%">
        </div>
      </div>
      <span class="text-h5 text-weight-bold q-mb-sm">
        Dashboard Penjualan
      </span>
      <div class="row justify-between">
        <div class="col-md-5 col-sm-12 col-xs-12 q-pa-sm q-ma-sm bg-white" style="border-radius: 10px">
          <div class="column q-pa-sm">
            <div class="row items-center">
              <div class="col-auto">
                <q-avatar size="100px">
                  <img :src="`${this.$urlImagePemasaran}/file/api/v1/toko/logo/${data.toko.gambar_toko}`">
                </q-avatar>
              </div>
              <div class="col">
                <div class="column q-ml-sm text-grey-9 q-gutter-sm">
                  <span class="text-h6 text-weight-bold text-grey-10">{{ data.toko.nama_toko }}</span>
                  <span><q-icon class="q-mr-sm" name="location_on" />{{ data.toko.alamat }}</span>
                  <span><q-icon class="q-mr-sm" name="call" />{{ data.toko.no_wa }}</span>
                  <q-btn :to="{ name: 'editProfile',  params: {idFitur: 50} }" label="Edit Profil" no-caps style="background: #FFBB16; color: black"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-5 col-xs-12 q-pa-sm q-ma-sm bg-white" style="border-radius: 10px">
          <div class="column q-pa-sm q-gutter-sm">
            <span class="text-h5 text-weight-bold">Total Barang Terdaftar</span>
            <span class="text-h3"><q-icon name="shopping_cart"/> {{ rows.length }}</span>
            <q-btn label="Kelola Barang" @click="this.$router.push({ name: 'kelolaBarang', params: {idFitur: 50} })" no-caps style="background: #FFBB16; color: black"/>
          </div>
        </div>
        <div class="col-md-3 col-sm-5 col-xs-12 q-pa-sm q-ma-sm bg-white" style="border-radius: 10px">
          <div class="column q-pa-sm q-gutter-sm">
            <span class="text-h5 text-weight-bold">Etalase/Katalog</span>
            <span class="text-h3"><q-icon name="shopping_bag"/> {{ data.etalase.length }}</span>
            <q-btn label="Kelola Katalog" @click="this.$router.push({ name: 'kelolaEtalase', params: {idFitur: 51} })" no-caps style="background: #FFBB16; color: black"/>
          </div>
        </div>
      </div>
      <q-table
        flat bordered
        :rows="rows"
        :columns="columns"
        :filter="search"
        row-key="name"
      >
        <template v-slot:top>
          <div class="col-12">
            <div class="row justify-between">
              <div class="col-md-2 col-xs-12">
                <span class="text-h5">Data Barang</span>
              </div>
              <div class="col-md-4 col-xs-12">
                <div class="row justify-end">
                  <q-input class="col-md-7 col-sm-6 col-xs-12" dense outlined v-model="search" label="Cari Produk" placeholder="Cari Produk">
                    <template v-slot:append>
                      <q-btn flat dense icon="search"/>
                    </template>
                  </q-input>
                  <!-- <q-select
                    class="col-md-4 col-sm-6 col-xs-6"
                    dense
                    outlined
                    v-model="etalase"
                    option-value="keterangan"
                    option-label="nama_etalase"
                    option-disable="inactive"
                    :options="data.etalase"
                    emit-value
                    map-options
                    label="Etalase" /> -->
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="aksi" :props="props">
              <q-btn label="Lihat Detail" :to="{ name: 'detailProdukPemasaran', params: {idFitur: 50, produk_id: props.row.produk_id} }" no-caps style="background: #FFBB16; color: black"/>
            </q-td>
            <q-td key="nama_produk" :props="props">
                {{ props.row.nama_produk }}
            </q-td>
            <q-td key="etalase" :props="props">
                {{ props.row.nama_etalase }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      step: 1,
      search: '',
      member_pemasaran: null,
      etalase: '',
      notFoundStore: true,
      nama_toko: '',
      slogan_toko: '',
      deskripsi_toko: '',
      nomor_whatsapp: '',
      alamat_toko: '',
      file: null,
      file_banner: null,
      imageUrl: '',
      imageUrlBanner: '',
      data: null,
      nik_decrypt: '',
      id_member_pemasaran: null,
      showScrollToTopButton: false,
      products: [],
      columns: [
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi', sortable: true },
        { name: 'nama_produk', align: 'left', label: 'Nama Produk', field: 'nama_produk', sortable: true },
        { name: 'etalase', align: 'left', label: 'Etalase', field: 'etalase', sortable: true }
      ],
      rows: [
        {
          nama_produk: 'nama_produk',
          etalase: 'etalase'
        }
      ],
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
    }
  },
  async created () {
    this.getHash()
    // console.log('Get Profile KPB')
    // console.log(this.$getProfile())
    // console.log('================================================================')
  },
  unmounted () {
    window.removeEventListener('scroll', this.toggleScrollToTopButton)
  },
  methods: {
    getHash () {
      this.$showLoading()
      this.$api.get('hashing/encrypt', {
        params: {
          data: this.$getProfile().nik,
          key: '423F4528482B4D6251655468566D597133743677397A24432646294A404E635266556A586E5A7234753778214125442A472D4B6150645367566B59703373357638792F423F4'
        }
      }).finally(() => this.$hide())
        .then((res) => {
          this.nik_decrypt = res.data
          this.getToko(res.data)
        }).catch(() => this.$commonErrorNotif())
    },
    getToko (nik) {
      this.$showLoading()
      this.$api.get(`toko/${nik}/check`)
        .finally(() => {
          this.$hide()
        }).then((res) => {
          // console.log(res)
          if (res.data.toko === null) {
            if (res.data.message === 'Cannot get Toko because Nik not listed') {
              // console.log('daftar')
              this.regist(nik)
            } else if (res.data.message === 'Member Id Found but no toko has found') {
              this.getIdMember()
            }
            this.$notif(res.data.message, 'negative')
          } else {
            this.$q.localStorage.set('toko_pemasaran', res.data.toko[0])
            this.notFoundStore = false
            this.data = res.data.toko[0]
            this.getIdMember()
            this.getProduk(this.data.toko.toko_id)
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getIdMember () {
      this.$showLoading()
      this.$api.post('auth/login-kpb', {
        username: this.nik_decrypt,
        password: this.$getProfile().member.users_login.password
      }).finally(() => {
        this.$hide()
      }).then((res) => {
        // console.log(res)
        this.$q.localStorage.set('member_pemasaran', res.data)
        // this.id_member_pemasaran = res.data
        this.member_pemasaran = this.$q.localStorage.getItem('member_pemasaran')
        // console.log(this.$q.localStorage.getItem('member_pemasaran'))
      }).catch(() => this.$commonErrorNotif())
    },
    getProduk (idToko) {
      this.$showLoading()
      this.$api.get('produk/toko', {
        params: {
          page: 0,
          size: 5,
          status: true,
          statusAdmin: true,
          type: 'pemasaran',
          tokoId: idToko
        }
      }).finally(() => {
        this.$hide()
      }).then((res) => {
        // console.log(res)
        this.rows = res.data.content
      }).catch(() => this.$commonErrorNotif())
    },
    regist (nik) {
      this.$showLoading()
      const user = this.$getProfile()
      this.$api.post('auth/register', {
        email: user.member.email,
        jenis_kelamin: user.jenis_kelamin === 'Laki-Laki' ? 'Pria' : 'Wanita',
        nama_belakang: '-',
        nama_depan: user.nama,
        nik: nik,
        nomor_telepon: user.member.no_hp,
        password: user.member.users_login.password,
        tanggal_lahir: user.tanggal_lahir,
        tempat_lahir: user.tempat_lahir,
        username: null,
        form: 'kpb'
      }).finally(() => this.$hide())
        .then((res) => {
          if (res.data) {
            this.getHash()
          } else {
            this.$notif('Hubungi Admin untuk kendala ini', 'negative')
          }
        }).catch(() => {
          // console.log(err)
          this.$commonErrorNotif()
        })
    },
    async createToko () {
      // console.log(this.$store.state.area.kabupaten)
      this.$showLoading()
      let imageName = 'default.png'
      if (this.file) {
        const formData = new FormData()
        formData.append('image', this.file)
        await this.$axios.post('https://api.e-kpb.shop/file/api/v1/toko/logo', formData)
          .then((res) => {
            // console.log(res)
            imageName = res.data
          }).catch(() => this.$commonErrorNotif())
      }
      // console.log(imageName)
      const headers = {
        Authorization: `Bearer ${this.member_pemasaran?.token}` // Replace with your authorization token
      }
      await this.$axios.post('https://api.e-kpb.shop/toko/api/v1/toko/kpb', {
        member_id: this.member_pemasaran.member_id,
        nama_toko: this.nama_toko,
        domain_toko: this.nama_toko.toLocaleLowerCase().replace(/ /g, '_'),
        slogan: this.slogan_toko,
        alamat: this.alamat_toko,
        aktif: true,
        gambar_toko: imageName.replace(/ /g, '%20'),
        deskripsi: this.deskripsi_toko,
        kabupaten_id: this.$store.state.area.kabupaten.id
      }, { headers })
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          if (res.status === 201) {
            this.getHash()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onFileUploaded () {
      this.imageUrl = URL.createObjectURL(this.file)
    },
    onFileUploadedBanner () {
      this.imageUrlBanner = URL.createObjectURL(this.file_banner)
    },
    scrollToComponent () {
      const element = document.getElementById('myComponent')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    },
    toggleScrollToTopButton () {
      this.showScrollToTopButton = window.scrollY > 100
    },
    scrollToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>
<style>

@media screen and (min-width: 966px) {
  .stepper {
    width: 500px
  }
}
</style>
