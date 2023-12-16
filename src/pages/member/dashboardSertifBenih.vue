<template>
  <q-page style="background: #F2F7F5">
    <div class="column q-gutter-sm text-green-10 ">
      <div class="row q-gutter-sm justify-between">
        <div class="col-xs-12 col-sm-12 col-lg-7 column q-pa-md">
          <div class="col-auto">
            <q-btn
              :to="{
                name: 'indexLayanan', params: { idRole: $route.params.idRole }
              }"
              class="q-my-md"
              unelevated
              color="green-10"
              icon="dashboard"
              label="Kembali Ke Menu Layanan"
            />
          </div>
          <div class="row items-center">
            <q-img src="img/sertif_benih/logo_lampung.png" :width="this.$q.screen.xs ? '50px' :'90px'"/>
            <div class="column q-ml-md text-black">
              <span class="text-weight-bold text-h4">Dinas Perkebunan</span>
              <span class="text-weight-reguler text-h5">Provinsi Lampung</span>
            </div>
          </div>
          <span class="text-weight-bold text-h4 q-mt-sm">Pengawasan dan sertifikasi benih Komoditi Perkebunan oleh BP2MB</span>
          <span class="text-weight-regular q-mt-sm text-h6">Sertifikasi benih adalah rangkaian kegiatan untuk mendapatkan serifikasi mutu benih tanaman perkebunan yang dilaksanakan oleh Lembaga sertifikasi melalui pemeriksaan dokumen dan lapangan sehingga dapat digunakan sebagai bahan tanam dan telah memenuhi syarat untuk diedarkan</span>
          <ul v-if="visible">
            <li><span class="text-subtitle2">Mempertahankan kemurnian keturunan yang dimiliki oleh suatu varietas,</span></li>
            <li><span class="text-subtitle2">Membantu para produsen benih dalam memproduksi benih dengan mutu yang baik,</span></li>
            <li><span class="text-subtitle2">Membantu para petani dalam mendapatkan benih serta penyediaannya di pasaran.</span></li>
          </ul>
        </div>
        <!-- <div class="">{{ this.$q.screen.width }}</div> -->
        <div class="col-lg-4 col-sm-12 q-pa-sm">
          <q-img src="img/sertif_benih/icon_header.png" style="width: 100%"/>
        </div>
      </div>
      <div v-if="visible" class="q-ma-md q-py-md q-px-xl text-white text-center column" style="border-radius: 10px; background: #024830; color: white">
        <div class="items-center">
          <q-icon name="mdi-sprout" color="yellow-8" size="xl" class="text-center q-mt-md"/>
        </div>
        <div class="text-h4 text-weight-bold q-mt-md">Langkah -Langkah Untuk Melakukan Proses <br> <span class="text-yellow-8">Sertifikasi</span> Benih</div>
        <div :class="`row text-left ${this.$q.screen.xs ? 'q-px-sm' : 'q-px-xl'}`">
          <div
            v-for="(list,i) in listLangkah"
            :key="i"
            class="col-lg-3 col-md-6 col-sm-12 q-pa-sm">
            <q-card class="bg-white q-pa-md text-black q-pa-md column" style="border-radius: 10px; height: 100%">
              <div class="row">
                <div class="bg-green-4 text-white col-auto q-px-md q-py-sm" style="border-radius: 10px">{{ i+1 > 10 ? `0${i+1}` : i+1  }}</div>
              </div>
              <span class="text-weight-medium q-mt-sm">{{ list.title }}</span>
              <span class="q-mt-sm">{{ list.subtitle }}</span>
            </q-card>
          </div>
        </div>
      </div>
      <q-carousel
        arrows
        infinite
        autoplay
        animated
        control-text-color="primary"
        control-color="white"
        control-type="flat"
        transition-prev="slide-right"
        transition-next="slide-left"
        control-size="lg"
        v-model="slide"
        style="background-color: transparent;"
      >
        <q-carousel-slide :name="d" style="padding: 10px;" v-for="d in listImage" :key="d">
          <div class="row fit justify-start items-center q-col-gutter no-wrap">
            <q-img
              :src="`img/sertif_benih/carousel/${d}`"
              style="border-radius:10px; height:100%"
            />
          </div>
        </q-carousel-slide>
      </q-carousel>
      <div v-if="visible" class="q-ma-md q-py-lg q-px-xl bg-white" style="border-radius: 10px">
        <div class="row justify-evenly">
          <div class="col-md-4 col-xs-12 column q-gutter-sm">
            <span class="text-weight-bold text-h5">Berkas yang perlu disiapkan untuk sertifikasi benih</span>
            <span>Persiapkan segala kebutuhan sebelum melakukan sertifikasi agar dapat melakukan segala proses secara lancar</span>
            <div class="items-center text-center q-my-lg">
              <img src="img/sertif_benih/pupuk.png" width="100"/>
            </div>
          </div>
          <div class="col-auto text-black q-gutter-sm">
            <div
              v-for="(list, index) in listData"
              :key="index"
              class="column">
              <span class="text-weight-bold" style="font-size: 18px">{{ list.title }}</span>
              <span v-if="list.isSubtitle">{{ list.subtitle }}</span>
              <div class="row q-gutter-sm" v-if="list.isUrl">
                <a
                  v-for="(url, index) in listData[index].urls"
                  :key="index"
                  :href="url.url">{{ url.titleurl }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="q-pa-sm">
        <div class="row">
          <div class="col-md-6 q-pa-sm column">
            <div class="q-pa-sm border-shadow bg-white column" style="height: 100%">
              <div class="row items-center">
                <div class="col-auto">
                  <q-img src="img/sertif_benih/logo_lampung.png" style="width: 30px"/>
                </div>
                <div class="col-auto column">
                  <span class="text-weight-bold text-h6 text-weight-medium q-ml-md">Dinas Perkebunan</span>
                  <span class="q-ml-md">Provinsi Lampung</span>
                </div>
              </div>
              <span class="q-mt-md text-weight-light">Dinas Perkebunan mempunyai tugas melaksanakan urusan pemerintahan daerah di bidang perkebunan dan peternakan berdasarkan asas otonomi dan tugas pembantuan.</span>
            </div>
          </div>
          <div class="col-md-6 q-pa-sm column">
            <div class="q-pa-sm border-shadow bg-white column" style="height: 100%">
              <div class="row items-center">
                <div class="col-auto">
                  <q-img src="img/sertif_benih/logo_lampung.png" style="width: 30px"/>
                </div>
                <div class="col-auto column">
                  <span class="text-weight-bold text-h6 text-weight-medium q-ml-md">BP2MB</span>
                  <span class="q-ml-md">Balai pengawasan pengujian mutu benih</span>
                </div>
              </div>
              <span class="q-mt-md text-weight-light">Dinas Perkebunan mempunyai tugas melaksanakan urusan pemerintahan daerah di bidang perkebunan dan peternakan berdasarkan asas otonomi dan tugas pembantuan.</span>
            </div>
          </div>
        </div>
      </div>
      <div class="q-pa-lg">
        <div class="row">
          <div class="col-md-4 column">
            <span class="text-h4 text-weight-bold text-primary">
              Berkas Pengajuan Sertifikasi Benih
            </span>
            <span>Persiapkan segala kebutuhan sebelum melakukan sertifikasi agar dapat melakukan segala proses secara lancar</span>
          </div>
          <div class="col column">
            <div
              v-for="(list, index) in listData"
              :key="index"
              class="q-pa-sm border-shadow q-ma-sm column">
              <span class="text-weight-bold" style="font-size: 18px">{{ list.title }}</span>
              <span v-if="list.isSubtitle">{{ list.subtitle }}</span>
              <div class="row q-gutter-sm" v-if="list.isUrl">
                <a
                  v-for="(url, index) in listData[index].urls"
                  :key="index"
                  :href="url.url">{{ url.titleurl }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="visible" class="q-ma-md q-py-lg q-px-xl">
        <div class="row">
          <div
            class="col-lg-3 col-md-6 col-sm-12 q-pa-sm">
            <div class="column q-gutter-md" style="border-radius: 10px">
              <span class="text-h4 text-weight-bold">Benih yang bisa disertifikasi</span>
              <span class="text-grey-8 text-h6 text-weight-regular">Daftar list benih yang bisa disertifikasi</span>
            </div>
          </div>
          <div
            v-for="(benih, i) in listBenih"
            :key="i"
            class="col-lg-3 col-md-6 col-sm-12 q-pa-sm">
            <div class="column">
              <q-img :src="`img/sertif_benih/benih/benih_${benih.imageUrl}.png`"/>
              <div class="bg-white column q-pa-md" style="border-radius: 0px 0px 10px 10px">
                <span class="text-yellow-5">Sertifikasi Benih</span>
                <span class="text-black text-h6">{{ benih.namaBenih }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="q-ma-md q-py-lg q-px-xl column text-center">
        <span class="text-h4 text-weight-bold">Penilaian Dalam Sertifikasi <br> Benih</span>
        <div class="row justify-evenly q-mt-lg">
          <div
            v-for="(icon, i) in iconNilai"
            :key="i"
            class="col-lg-1 col-md-3 col-sm-4 col-xs-6 text-center items-center q-pa-sm column">
            <div id="outer-circle">
              <div id="inner-circle">
                <span id="inside-content">
                  <q-img :src="`img/sertif_benih/icon/${icon.icon}.png`" style="width: 50px; height: 50px;"/>
                </span>
              </div>
            </div>
            <span class="q-mt-sm text-black text-weight-medium">{{ icon.namaIcon }}</span>
          </div>
        </div>
      </div>
      <div class="q-pa-md row" style="background: #024830; color: white">
        <div class="col-md-6 q-pa-md column">
          <div class="row items-center">
            <div class="col-auto">
              <q-img src="img/sertif_benih/logo_lampung.png" style="width: 25px"/>
            </div>
            <span class="text-weight-bold text-h6 text-weight-medium q-ml-md">Dinas Perkebunan Provinsi Lampung</span>
          </div>
          <span class="q-mt-md text-weight-light">Dinas Perkebunan mempunyai tugas melaksanakan urusan pemerintahan daerah di bidang perkebunan dan peternakan berdasarkan asas otonomi dan tugas pembantuan.</span>
          <div class="row q-mt-md text-weight-light">
            <div class="col-auto">
              <q-icon name="mdi-map-marker" size="sm"/>
            </div>
            <span class="col q-ml-md">Jl. Basuki Rahmat No.08, Talang, Kec. Tlk. Betung Utara, Kota Bandar Lampung, Lampung 35211</span>
          </div>
          <div class="row q-mt-md text-weight-light">
            <div class="col-auto">
              <q-icon name="mdi-phone" size="sm"/>
            </div>
            <span class="col q-ml-md">(0721) 487865</span>
          </div>
        </div>
        <div class="col-md-6 q-pa-md column">
          <div class="row items-center">
            <div class="col-auto">
              <q-img src="img/sertif_benih/logo_lampung.png" style="width: 25px"/>
            </div>
            <span class="text-weight-bold text-h6 text-weight-medium q-ml-md">Balai pengawasan pengujian mutu benih</span>
          </div>
          <span class="q-mt-md text-weight-light">UPTD Balai Pengawasan dan Pengujian Mutu Benih (BP2MB) Lampung terletak di Kota Bandar Lampung. Perusahaan ini bekerja di industri berikut: Keanggotaan Organisasi Lainnya.</span>
          <div class="row q-mt-md text-weight-light">
            <div class="col-auto">
              <q-icon name="mdi-map-marker" size="sm"/>
            </div>
            <span class="col q-ml-md">JL. Raya Lintas Sumatera Km. 32, 35363, Rangai Tri Tunggal, Kec. Katibung, Kabupaten Lampung Selatan, Lampung 35452</span>
          </div>
          <div class="row q-mt-md text-weight-light">
            <div class="col-auto">
              <q-icon name="mdi-phone" size="sm"/>
            </div>
            <span class="col q-ml-md">(0721) 91755</span>
          </div>
        </div>
      </div>
      <div class="bg-yellow-8 text-center text-weight-bold q-pa-sm" style="color: #024830;">
        <span>DINAS PERKEBUNAN PROVINSI LAMPUNG © 2023. Hak Cipta Dilindungi.</span>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      slide: 'carousel1.png',
      listImage: [
        'carousel1.png',
        'carousel2.png',
        'carousel3.png'
      ],
      visible: false,
      listData: [
        {
          title: 'Surat Permohonan Sertifikasi Benih',
          isSubtitle: true,
          subtitle: 'Surat permohonan sertifikasi ditunjukan ke UPTD BP2MB Dinas Perkebunan Provinsi Lampung yang merupakan sebagai bekti formal untuk kepentingan persyaratan administrasi',
          isUrl: true,
          urls: [
            {
              titleurl: 'Download template PDF',
              url: `${this.$baseURL}files/surat_permohonan.pdf`
            },
            {
              titleurl: 'Download template Word',
              url: `${this.$baseURL}files/surat_permohonan.docx`
            }
          ]
        },
        {
          title: 'Izin Usaha Produksi Benihan (IUPB)',
          isSubtitle: true,
          subtitle: 'Izin usaha Produksi Perbenihan pemohon harus memperoleh terlebih dahulurekomendasi sebagai produsen benih dan UPTDBP2MB Dinas Perkebunan Provinsi Lampung',
          isUrl: false
        },
        {
          title: 'Dokumentasi asal usul benih',
          isSubtitle: true,
          subtitle: 'DO/Kwitansi pembelian benih dan SK penetapan sumber benih a.n Mentri Pertanian RI',
          isUrl: false
        }
      ],
      listBenih: [
        {
          namaBenih: 'Benih Kopi',
          imageUrl: 'kopi'
        },
        {
          namaBenih: 'Benih Kelapa',
          imageUrl: 'kelapa'
        },
        {
          namaBenih: 'Benih Kakao',
          imageUrl: 'kakao'
        },
        {
          namaBenih: 'Benih Lada',
          imageUrl: 'lada'
        },
        {
          namaBenih: 'Benih Kelapa Sawit',
          imageUrl: 'sawit'
        }
      ],
      iconNilai: [
        {
          namaIcon: 'Varietas/Klon',
          icon: 'klon'
        },
        {
          namaIcon: 'Jumlah Benih Normal',
          icon: 'jumlah_daun'
        },
        {
          namaIcon: 'Jumlah Bedengan',
          icon: 'jumlah_layer'
        },
        {
          namaIcon: 'Tinggi Benih',
          icon: 'tinggi_benih'
        },
        {
          namaIcon: 'Umur Benih',
          icon: 'umur_benih'
        },
        {
          namaIcon: 'Jumlah Daun',
          icon: 'jumlah_daun'
        },
        {
          namaIcon: 'Diameter Benih',
          icon: 'diameter_benih'
        },
        {
          namaIcon: 'Ukuran Polybag',
          icon: 'ukuran_benih'
        },
        {
          namaIcon: 'Kesehatan Benih',
          icon: 'kesehatan_benih'
        },
        {
          namaIcon: 'Warna Daun',
          icon: 'warna_daun'
        }
      ],
      listLangkah: [
        {
          title: 'Masuk Ke Situs e-KPB',
          subtitle: 'Produsen benih melakukan login untuk kemudian masuk ke dalam menu sertifikasi benih di web e-KPB'
        },
        {
          title: 'Mengisi Form Permohonan',
          subtitle: 'Produsen memilih menu form permohonan sertifikasi dan mengisi form permohonan '
        },
        {
          title: 'Pemeriksaan Berkas  BP2MP',
          subtitle: 'Petugas BP2MB memeriksa kelengkapan form dan syarat-syarat lainnya'
        },
        {
          title: 'Menunggu Verifikasi',
          subtitle: 'Jika di setujui BP2MB akan melaksanakan Kunjungan lapangan dan memberikan tanggal kunjungan pada sistem E-Sertifikasi '
        },
        {
          title: 'ACC BP2MB',
          subtitle: 'BP2MB ACC Mengirim Sertifikasi Benih kepada Produsen Benih Dan sekaligus menginput data Benih '
        },
        {
          title: 'Pengumpulan Data',
          subtitle: 'Perekapan Data Produsen benih yang sudah di verifikasi'
        },
        {
          title: 'Pelaporan Ke Pusat',
          subtitle: 'Petugas BP2MP Melakuan Perekapan dan data dilaporkan ke pusat'
        },
        {
          title: 'ACC Permohonan',
          subtitle: 'BP2MB ACC Permohonan Produsen Benih dan produsen bisa mencetak sertifikat dan produsen malakukan pelebelan rekomendasi BP2MB'
        }
      ]
    }
  }
}
</script>
