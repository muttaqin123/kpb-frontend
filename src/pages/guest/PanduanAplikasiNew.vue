<template>
  <q-page>
    <!-- herro banner mulai -->
    <div style="background-color: #fff051">
      <div class="container row wrap justify-start items-center content-center q-py-xl">
        <!-- <div :class="`${this.$q.screen.xs ? 'col-12' : this.$q.screen.md ? 'col-9' : 'col-6'}`"> -->
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
          <div class="text-h4 text-weight-bold">
            Pusat Bantuan Aplikasi e-KPB
          </div>
          <div class="text-body q-mt-lg">
            Selamat datang dalam perjalanan baru Anda dengan aplikasi e-KPB! Kami hadir untuk membantu Anda mengatasi segala tantangan sehari-hari.
          </div>
        </div>
        <div class="col-1"></div>
        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-xs-12">
          <q-img
            src="img/landingpage/backgroundpanduan.png"
            :ratio="1"
            style="border-radius: 80px"
          />
        </div>
      </div>
    </div>
    <!-- herro banner selesai -->
    <!-- q&a mulai -->
    <div style="background-color: #F9F7F0;" class="q-pt-lg">
      <div class="column text-center">
        <div class="text-h4 text-weight-bold text-center">
          QNA
        </div>
      </div>
      <div class="column q-py-xl">
        <div class="col container">
          <q-list bordered class="rounded-borders">
            <q-expansion-item
              v-for="(pertanyaans, i) in pertanyaan" :key="i"
              expand-separator
              style="color: #000;
              font-family: Inter;
              font-size: 16px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;"
              :label= "pertanyaans.pertanyaan"
            >
              <q-card>
                <q-card-section class="text-body1">
                  {{ pertanyaans.jawaban }}
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-separator></q-separator>
          </q-list>
        </div>
      </div>
    </div>
    <!-- q&a selesai -->
  </q-page>
</template>

<script>
import { ref } from 'vue'
import listitem from '../user/listitem'
const menuList = [
  {
    icon: 'inbox',
    label: 'Beranda',
    separator: true,
    to: 'landingpage'
  },
  {
    icon: 'navigate_next',
    label: 'Layanan',
    separator: false,
    to: 'layanan'
  },
  {
    icon: 'navigate_next',
    label: 'Panduan Aplikasi',
    separator: false,
    to: 'panduan'
  },
  {
    icon: 'navigate_next',
    label: 'Portal Web',
    link: 'https://kpb.lampungprov.go.id/',
    target: '_blank',
    separator: true
  }
]
export default {
  setup () {
    return {
      listSosmed: listitem.listSosmed,
      drawer: ref(false),
      menuList,
      prompt: ref(false)
    }
  },
  data () {
    return {
      pertanyaan: [
        {
          pertanyaan: 'Apa saja program yang disediakan e-KPB?',
          jawaban: 'Program yang dapat disediakan di e-KPB adalah penebusan pupuk bersubsidi, sewa alat pertanian, akses informasi dan pembinaan, pengajuan asuransi, dan lain sebagainya, bisa di klik disini.   Program e-KPB tersedia untuk petani di 6 sektor, yaitu pertanian, perkebunan, perhutanan, kelautan dan perikanan, peternakan, dan holti-kultura. Selain petani, akun e-kpb juga menyediakan akun untuk anggota pemerintah daerah, bank dan lembaga keuangan, lembaga ekonomi desa/pasar, dan penyedia/penyalur sarana produksi.'
        },
        {
          pertanyaan: 'Bagaimana cara registrasi anggota di e-KPB?',
          jawaban: 'Registrasi anggota e-KPB dapat melalui 3 opsi pendaftaran. Opsi pertama apabila anda ingin registrasi secara mandiri, dapat melalui website  ini, klik disini untuk mendaftar.  Opsi kedua, yaitu secara otomatis terdaftar di alokasi. Terakhir, apabila anda adalah kelompok petani mandiri/perorangan, kalian dapat mendaftar langsung di call center e-KPB, dapat di klik disini.'
        },
        {
          pertanyaan: 'Bagaimana mengatasi kendala lupa password?',
          jawaban: 'Apabila ingin reset password, dapat hubungi ke call center e-KPB ke nomor 0821-8155-5123'
        },
        {
          pertanyaan: 'Apakah Bisa lebih dari 1  Role dalam setiap Akun?',
          jawaban: 'Bisa dalam pemilihan Role, sesuaikan dengan perorangan apakah Petani, Nelayan, Pekebun, Petani Hutan, Budidaya ikan Dll.'
        },
        {
          pertanyaan: 'Apakah saya bisa menjual produk saya melalui aplikasi e-KPB?',
          jawaban: 'Anda dapat menjual hasil pertanian apabila telah menjadi anggota e-KPB. Produk yang dapat dijual melalui aplikasi e-KPB adalah hasil pertanian serta makanan olahan.'
        }

      ]
    }
  }
}
</script>
