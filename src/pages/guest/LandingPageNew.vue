<template>
  <q-page>
    <!-- hero banner mulai -->
    <div style="background-color: #FFF051">
      <div
        :style="`${this.$q.screen.xs ? 'flex-direction: column-reverse;' : ''}`"
        :class="`container justify-between row items-center ${this.$q.screen.xs ? 'q-py-lg' : 'q-py-xl'}`">
        <!-- <div :class="`${this.$q.screen.xs ? 'col-12' : this.$q.screen.md ? 'col-9' : 'col-6'}`"> -->
        <div class="col-md-6 col-xs-12">
          <div class="text-h4 text-weight-bold text-weight-bold">
            Satu Portal Layanan untuk Mengakses Segala Fitur dan Layanan e-KPB
          </div>
          <div :class="`${this.$q.screen.xs ? 'body q-mt-md' : 'body q-mt-lg'}`">
            Seluruh Layanan di e-KPB tergabung menjadi satu platform aplikasi yang menghubungkan semua kepentingan pertanian.
          </div>
          <div class="row">
            <div class="column q-mt-lg">
              <div class="row justify-between">
                <div class="col-auto column q-px-sm">
                  <q-btn
                    no-caps
                    :size="`${this.$q.screen.xs || this.$q.screen.sm ? '16px' : '20px'}`"
                    label="Masuk Akun"
                    style="background-color: #1a1e22; color: white"
                    @click="prompt = true"
                  />
                </div>
                <div class="col-auto column q-px-sm">
                  <q-btn
                    no-caps
                    :size="`${this.$q.screen.xs || this.$q.screen.sm ? '16px' : '20px'}`"
                    outline
                    color="black"
                    label="Daftar Akun"
                    :to="{name: 'registerPage'}"
                  />
                </div>
              </div>
              <q-btn
                v-if="this.$q.screen.xs"
                no-caps
                flat
                :size="`${this.$q.screen.xs || this.$q.screen.sm ? '16px' : '24px'}`"
                class="full-width q-mr-md q-px-lg text-underline"
                label="Butuh Bantuan? Klik Disini"
                style="color: #1a1e22"
                :to="{name: 'panduan'}"
              />
            </div>
          </div>
        </div>
        <div
          v-if="!this.$q.screen.sm"
          class="col-md-5 col-xs-12">
          <q-img
            src="img/landingpage/backgroundhero.png"
            :ratio="1"
            style="border-radius: 80px"
          />
        </div>
      </div>
    </div>
    <!-- hero banner selesai -->
    <!-- Jumlah Keanggotaan Mulai -->
    <div style="background-color: #1a1e22">
      <div class="container row q-py-xl">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-mb-md">
          <div class="column">
            <div class="flex flex-center" v-if="this.loading">
              <q-skeleton type="QBtn" width="200px" height="70px"/>
            </div>
            <div class="flex flex-center text-white text-h2 text-weight-bold" v-else>{{ this.$formatNumber(data?.member) }}</div>
            <div class="flex flex-center text-h6" style="color: #FFF051">Total Member Aktif</div>
          </div>
          </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-mb-md">
          <div class="column">
            <div class="flex flex-center" v-if="this.loading">
              <q-skeleton type="QBtn" width="200px" height="70px"/>
            </div>
            <div class="flex flex-center text-white text-h2 text-weight-bold" v-else>{{ this.$formatNumber(data?.poktan) }}</div>
            <div class="flex flex-center text-h6" style="color: #FFF051">Total Kelompok Tani</div>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-mb-md">
          <div class="column">
            <div class="flex flex-center" v-if="this.loading">
              <q-skeleton type="QBtn" width="200px" height="70px"/>
            </div>
            <div class="flex flex-center text-white text-h2 text-weight-bold" v-else>{{ this.$formatNumber(data?.kios) }}</div>
            <div class="flex flex-center text-h6" style="color: #FFF051">Total Kios Pubers</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Jumlah Keanggotaan Selesai -->
    <!-- Keunggulan Mulai -->
    <div style="background-color: #F9F7F0;">
      <div class="container row wrap justify-between items-center content-center q-py-xl">
        <!-- <div :class="`${this.$q.screen.xs ? 'col-12' : this.$q.screen.md ? 'col-9' : 'col-6'}`"> -->
        <div class="col-md-5 col-xs-12 justify-center flex flex-center items-center row">
          <div class="col-xs-12 col-sm-5 col-md-12">
            <q-img
              src="img/landingpage/backgroundlayanan.png"
              :ratio="1"
              style="border-radius: 16px; width: 100%"
            />
          </div>
        </div>
        <div class="col-md-6 col-xs-12">
          <div class="text-h4 text-weight-bold q-mb-lg">
            Berbagai Keunggulan Layanan e-KPB
          </div>
            <q-banner v-for="(layanans, i) in layanan" :key="i" rounded class="bg-white text-black q-mb-sm">
              <div class="row wrap justify-start items-center content-center">
                <div class="col-xs-2 col-xl-1">
                  <q-avatar rounded :size="`${this.$q.screen.xs ? 'sm' : 'md'}`"  icon="done" color="yellow" text-color="black" />
                </div>
                <div class="col-10 body">
                  {{ layanans.val }}
                </div>
              </div>
            </q-banner>
        </div>
      </div>
    </div>
    <!-- Keunggulan Selesai -->
    <!-- Layanan Mulai -->
    <div class="q-pb-lg" style="background-color: #fff051;">
      <div class="container q-py-xl">
        <div class="col">
          <div class="text-h4 text-weight-bold text-center">
            Berbagai Layanan e-KPB
          </div>
        </div>
        <div class="col">
          <div class="body q-mt-lg text-center">
            Layanan dari e-KPB yang tersedia di sektor pertanian, perkebunan, peternakan, kehutanan, dan kelautan
          </div>
        </div>
        <div class="col q-mt-lg text-center">
          <q-btn
            no-caps
            :size="`${this.$q.screen.xs || this.$q.screen.sm ? '16px' : '24px'}`"
            class="q-mr-md q-px-lg"
            label="Lihat Semua Layanan"
            style="background-color: #1a1e22; color: white"
            :to="{name: 'layanan'}"
          />
        </div>
      </div>
        <q-img
          src="img/landingpage/layanan.png"
          :ratio="16/9"
          />
    </div>
    <!-- Layanan Selesai -->
    <!-- Layanan Tambahan Mulai -->
    <div style="background-color: #1a1e22;">
      <div class="column q-py-xl">
        <div class="col container text-center">
          <div class="text-h4 text-weight-bold text-white">
            Layanan Tambahan e-KPB
          </div>
          <div class="body q-mt-lg text-white">
            Layanan tambahan yang dapat anda akses tanpa harus login
          </div>
          <div class="row">
            <div
              v-for="(links, i) in link"
              :key="i"
              class="col-lg-4 col-xs-12 q-pa-sm">
              <div class="row bg-white q-pa-lg items-center" style="border-radius: 10px">
                <div class="col-auto q-pa-sm flex flex-center" style="border-radius: 100px; width: 70px; height: 70px">
                  <!-- <q-icon :name="sosmed.icon" :color="sosmed.color" size="lg"/> -->
                  <q-img
                    :src="links.img"
                    :ratio="1"
                  />
                </div>
                <div class="col-auto column q-ml-sm text-left">
                  <span class="text-h6 text-weight-bold">{{links.judul}}</span>
                  <span style="font-size:16px">{{links.deskripsi}}</span>
                  <div class="row">
                    <q-btn style="background: #FFBB16;" align="left" :href="links.link" target="_blank" label="Buka Aplikasi" flat no-caps/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Layanan Tambahan Selesai -->
    <!-- Cara Daftar Mulai -->
    <div style="background-color: #F9F7F0;">
      <div class="column q-py-xl">
        <div class="col container text-center">
          <div class="text-h4 text-weight-bold">
            Panduan Cara Mendaftar Menjadi Anggota e-KPB
          </div>
          <div class="body q-mt-lg">
            Dengan menjadi anggota e-KPB anda dapat menikmati segala layanan sesuai dengan role anda
          </div>
          <div class="row">
            <div v-for="(panduans, i) in panduan" :key="i" class="col-md-4 col-xs-12 q-pa-sm">
              <q-card
                class="my-card text-black"
                style="background: #FFF"
              >
                <q-card-section>
                  <div class="text-h4 text-weight-bold text-weight-bold text-center">{{ panduans.judul }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="text-body1">{{ panduans.deskripsi }}</div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Cara Daftar Selesai -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="whatsapp" color="green" />
      </q-page-sticky>
    <q-dialog v-model="prompt" persistent position="bottom">
      <q-card :style="`width: 350px;${$q.screen.lt.sm ? 'min-width:350px;' : 'min-width: 500px;'}`">
        <q-form @submit="onSubmit">
          <q-card-section class="row items-center">
            <div class="text-h6">Login Akun</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-separator />

          <q-card-section class="q-pt-none">
            <q-input
              v-model="username"
              label="Username"
              :rules="[val => !!val || 'Masukan Username']"
              autofocus
            />
            <q-input
              :type="isPassword ? 'password' : 'text'"
              v-model="password" label="Password"
              :rules="[val => val !== null || 'Masukan Password']"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="(isPassword = !isPassword)"
                />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <!-- <q-btn flat label="Batal" v-close-popup /> -->
            <q-btn flat label="Login" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      loading: true,
      data: {
        member: 0,
        poktan: 0,
        kios: 0
      },
      prompt: false,
      panduan: [
        {
          judul: '01.Registrasi',
          deskripsi: 'Apabila kamu tidak terdaftar sebagai petani e-RDKK,Kamu dapat melakukan registrasi manual di aplikasi,klik link ini untuk mendaftar'
        },
        {
          judul: '02.Verifikasi NIK',
          deskripsi: 'Setelah melakukan pendaftaran melalui aplikasi, selanjutnya kamu harus menunggu proses verifikasi NIK. Proses ini membutuhkan waktu 1x24 Jam'
        },
        {
          judul: '03.Pemilihan Role',
          deskripsi: 'Setalah NIK kamu sudah terverifikasi, silahkan ajukan role yang sesuai dengan profesi anda, dan anda dapat memilih lebih dari satu role yang sesuai dengan profesi anda'
        },
        {
          judul: '04.Verifikasi Role',
          deskripsi: 'Role yang sudah diajukan akan diverifikasi lagi dalam 1x24 jam oleh pihak admin e-KPB untuk memastikan role yang diajukan sesuai dengan profesi anda.'
        },
        {
          judul: '05.Akun Siap Digunakan',
          deskripsi: 'Akun yang sudah melewati tahap verifikasi NIK dan verifikasi Role sudah dapat digunakan untuk mengakses layanan yang tersedia di berbagai role yang sudah diajukan'
        }
      ],
      layanan: [
        {
          val: 'Anggota petani yang terdaftar di e-RDKK otomatis anggota e-KPB'
        },
        {
          val: 'Penyediaan alat dan mesin pertanian serta kebutuhan bibit dan pupuk'
        },
        {
          val: 'Pembinaan manajemen usaha dan teknologi'
        },
        {
          val: 'Akses keuangan, KUR, dan Asuransi Usaha kepada petani dan peternak'
        },
        {
          val: 'Platform yang mempermudah petani, pekebun, peternak, dan nelayan'
        }
      ],
      link: [
        {
          img: 'img/landingpage/icon_gudter.svg',
          judul: 'Gudang Ternak',
          deskripsi: 'Informasi usaha peternakan',
          link: 'https://gudter.e-kpb.lampungprov.go.id/'
        },
        {
          img: 'img/landingpage/icon_halmed.svg',
          judul: 'Halo Medic Vet',
          deskripsi: 'Konsultasi Dokter Hewan',
          link: 'https://halmed.e-kpb.lampungprov.go.id/'
        },
        {
          img: 'img/landingpage/icon_pemasaran.svg',
          judul: 'e-Pemasaran',
          deskripsi: 'Pemasaran Hasil Pertanian',
          link: 'https://e-kpb.lampungprov.go.id/pemasaran/dashboard'
        }
        // {
        //   judul: 'e-Market',
        //   link: 'https://e-kpb.shop/'
        // }

      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('/master/landing-page')
        .then((res) => {
          // console.log(res)
          if (res.data.status) {
            this.loading = false
            this.data = res.data.result
            // const dataRes = res.data.result
            // const counting = setInterval(() => {
            //   if (this.data.member < dataRes.member) {
            //     this.data.member += 1
            //   }
            //   if (this.data.poktan < dataRes.poktan) {
            //     this.data.poktan += 1
            //   }
            //   if (this.data.kios < dataRes.kios) {
            //     this.data.kios += 1
            //   }
            //   if (this.data.member > dataRes.member && this.data.poktan > dataRes.poktan && this.data.kios > dataRes.kios) {
            //     clearInterval(counting)
            //   }
            // }, 1)
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
