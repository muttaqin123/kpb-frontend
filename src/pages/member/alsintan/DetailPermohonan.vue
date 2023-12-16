<template>
  <q-page padding>
    <q-card flat>
        <q-card-section class="text-center bg-transparent">

<!--          <img style="width: 35%" src="alsintan/datapeminjam.jpeg">-->
          <div class="text-h6 text-center">Data Permohonan Peminjaman Barang</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col-lg-8" style="padding-right: 5px; padding-bottom: 5px">
              <q-card bordered flat>
                <q-card-section>
                  <div class="row">
                    <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                      <div>
                        <q-carousel
                          arrows
                          animated
                          :autoplay="autoplay"
                          v-model="slide"
                          height="388px"
                          v-model:fullscreen="fullscreen"
                        >
                          <q-carousel-slide name="first" :img-src="data.mm_img != null ? $baseURL+'file-sarpras/'+data.mm_img : 'alsintan/barangsewa/tractorsampel.png'">
                          </q-carousel-slide>
                          <template v-slot:control>
                            <q-carousel-control
                              position="bottom-right"
                              :offset="[18, 18]"
                            >
                              <q-btn
                                push round dense color="white" text-color="primary"
                                :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                                @click="fullscreen = !fullscreen"
                              />
                            </q-carousel-control>
                          </template>
                        </q-carousel>
                      </div>
                    </div>

                    <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                      <q-scroll-area style="padding-left:10px; height: 388px;">
                        <div>
                          <q-item>
                            <q-item-section>
                              <q-item-label class="text-h6">{{ data.mm_nama + '&nbsp;' + data.mm_merk }}</q-item-label>
                            </q-item-section>
                          </q-item><br />
                          <q-separator />

                          <q-tabs
                            v-model="tabrinci"
                            dense
                            class="text-grey"
                            active-color="primary"
                            indicator-color="primary"
                            align="justify"
                            narrow-indicator
                          >
                            <q-tab name="rincian" label="Detail" />
                            <q-tab name="info" label="Info Penting" />
                          </q-tabs>

                          <q-separator />

                          <q-tab-panels v-model="tabrinci" animated>
                            <q-tab-panel name="rincian">
                              <p style="color: gray">Kondisi: Baik
                                <br />Merk/ Seri: {{data.mm_merk}}
                                <br />Harga/ Satuan: {{harga}}
                                <br /></p>

                              <p class="text-bold">Deskripsi:</p>
                              <span v-html="data.mm_deskripsi">
                    </span>

                            </q-tab-panel>

                            <q-tab-panel name="info">
                              <div class="text-h6"> Kebijakan Retur / Pengembalian Barang</div>
                              <p>Syarat pengembalian barang:</p>
                              <ul>
                                <li>Barang yang kami kirim tidak sesuai pesanan.</li>
                                <li>Barang rusak (sobek / bolong) ketika sampai di tujuan.</li>
                              </ul>

                              <p>Apabila memenuhi salah satu syarat di atas, maka boleh mengembalikan barang ke kami dan ongkir kami tanggung.</p>

                              <p>KASUS KHUSUS JIKA:</p>
                              <ul>
                                <li>Barang yang sampai tidak sesuai dengan keinginan karena konsumen salah menyebutkan nama produk</li>

                                <li>Penyewa Menggelapkan Barang maupun menukar komponen dari barang yang disewa</li>
                              </ul>

                              <p>maka produk tetap boleh dikembalikan dengan syarat ongkir ditanggung oleh penyewa.</p>

                              <p>Ada masalah/keluhan?<br />
                                Hubungi kami langsung melalui pesan melalui Tokopedia.</p>

                              <p>Anda puas, kami senang!</p>

                              <p>Semoga terjalin hubungan yang baik dan berkelanjutan.<br />
                                Selamat berbelanja.</p>
                            </q-tab-panel>

                          </q-tab-panels>

                        </div>
                      </q-scroll-area>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
              <br />
              <q-card flat bordered>
                <div class="row">
                  <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-item-section>
                      <q-input  class="full-width" v-model="form.permohonan_tgl_pinjam" label="Permohonan Tanggal Pinjam" mask="date" :rules="['permohonan_tgl_pinjam']">
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="form.permohonan_tgl_pinjam">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </q-item-section>
                  </q-item>
                  <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-item-section>
                      <q-input  class="full-width" v-model="form.permohonan_tgl_kembali" label="Permohonan Tanggal Kembali" mask="date" :rules="['permohonan_tgl_kembali']">
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="form.permohonan_tgl_kembali">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </q-item-section>
                  </q-item>
                  <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-item-section>
                      <q-input type="number" v-model="form.permohonan_jumlah_barang" :rules="[val => val !== null || 'Mohon Isi']" label="Permohonan Jumlah Barang"/>
                    </q-item-section>
                  </q-item>
                  <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-item-section>
                      <q-input type="number" v-model="form.permohonan_luas_lahan" :rules="[val => val !== null || 'Mohon Isi']" label="Luas Lahan (Ha)"/>
                    </q-item-section>
                  </q-item>
                  <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-item-section>
                      <q-input type="text" v-model="form.desa" :rules="[val => val !== null || 'Mohon Isi']" label="Desa"/>
                    </q-item-section>
                  </q-item>
                  <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-item-section>
                      <q-input type="text" v-model="form.permohonan_nama_poktan" :rules="[val => val !== null || 'Mohon Isi']" label="Poktan"/>
                    </q-item-section>
                  </q-item>
                  <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <q-item-section>
                      <q-input
                        v-model="form.permohonan_alamat"
                        label="Alamat Pengiriman"
                        type="textarea"
                      />
                    </q-item-section>
                  </q-item>
                  <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-item-section>
                      <q-input type="text" v-model="form.permohonan_kontak_penerima" :rules="[val => val !== null || 'Mohon Isi']" label="Kontak Pemohon (HP/ WA)"/>
                    </q-item-section>
                  </q-item>
                  <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-item-section>
                      <span class="text-bold">Unduh File KTP Pemohon <span @click="toFile(form.permohonan_file_ktp)" style="color: teal;cursor:pointer;"><u>Disini</u></span></span>
                    </q-item-section>
                  </q-item>
                  <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-item-section>
                      <span class="text-bold">Unduh File Surat Permohonan <span @click="toFile(form.permohonan_file_suratpermohonan)" style="color: teal;cursor:pointer;"><u>Disini</u></span></span>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="form.permohonan_file_rekomendasi != null" class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <q-item-section>
                      <span class="text-bold">Unduh File Surat Rekomendasi <span @click="toFile(form.permohonan_file_rekomendasi)" style="color: teal;cursor:pointer;"><u>Disini</u></span></span>
                    </q-item-section>
                  </q-item>
                </div>
              </q-card>
            </div>
            <div class="col-lg-4" >
              <q-card flat bordered>

                <div v-if="form.permohonan_status_pinjam === 5"  class="q-pa-md" >
                  <div class="text-center">
                    <p><strong>Konfirmasi Pengiriman</strong></p>
                    <img src="alsintan/deliver.png" style="width: 30%" /><br />
                    <q-btn @click="UpdateStatus(form.permohonan_id, form.member_id_pemohon,6)" label="Konfirmasi/ Telah Sampai" outline color="purple" />
                  </div>
                  <div style="text-align: justify; padding-top: 10px"><b>Catatan:</b>
                    Klik Button Diatas Jika Barang yang Dikirim Telah Sampai Ke Alamat Anda.
                  </div>
                </div>
                <q-separator />
                <div v-if="form.feedback_brigade != null"  class="q-pa-md" >
                  <span><b>Catatan Dari Penyedia/ Brigade:</b><br />
                  {{form.feedback_brigade}}
                  </span>
                </div>
                <q-separator />
                <div class="q-px-lg q-pb-md">
                <q-timeline color="secondary">

                  <div class="text-center">
                    <H5>Status Permohonan</H5>
                  </div>
                  <q-timeline-entry v-for="(a, i) in log" :key="i"
                    :title="a.log_dtl_status"
                    :subtitle="$parseDate(a.created_at).fullDate"
                  >
                    <div>
                     {{a.log_keterangan}}
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </div>
              </q-card>
            </div>
          </div>
        </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import { parseProfile } from '../../../boot/Profile'
const profile = parseProfile()
const model = () => {
  return {
    permohonan_tgl_pinjam: '2023/05/01',
    permohonan_tgl_kembali: '2023/05/01',
    permohonan_jumlah_barang: 0,
    permohonan_luas_lahan: 0,
    permohonan_alamat: null,
    permohonan_kontak_penerima: '',
    permohonan_file_ktp: '',
    permohonan_file_suratpermohonan: '',
    permohonan_file_rekomendasi: '',
    permohonan_status_pinjam: '',
    desa: '',
    permohonan_nama_poktan: '',
    permohonan_id: '',
    feedback_brigade: ''
  }
}
export default {
  data () {
    return {
      form: model(),
      data: [],
      tab: 'detail',
      tabrinci: 'rincian',
      tabhistory: 'now',
      slide: 'first',
      autoplay: true,
      fullscreen: false,
      harga: 0,
      log: []
    }
  },
  methods: {
    resetForm () {
      this.form = model()
    },
    getPermohonan () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/member/detail/riwayat/${atob(this.$route.params.id)}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.form = res.data.result
          this.data = res.data.result.mm_detail
          this.getHarga(res.data.result.permohonan_stok_id)
        }).catch(() => this.$commonErrorNotif())
    },
    getHarga (id) {
      this.$showLoading()
      this.$axios.get(`alsintan/master-harga/getbyidstok/${id}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.harga = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(res.data.result.harga) + ' / ' + res.data.result.satuan_harga
        }).catch(() => this.$commonErrorNotif())
    },
    getLogTransaksi () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/member/log/${profile.member.id_member}/${atob(this.$route.params.id)}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.log = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    UpdateStatus (idtr, idpemohon, status) {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/brigade/update-statuspeminjaman/${idpemohon}/${idtr}/${status}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.getPermohonan()
            this.getLogTransaksi()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    // konfirmasiSampai (id) {
    //   this.$showLoading()
    //   this.$axios.get(`alsintan/transaksi/member/konfirm-sampai/${profile.member.id_member}/${id}`, this.$createToken())
    //     .finally(() => this.$hide())
    //     .then(res => {
    //       // console.log(res)
    //       this.getPermohonan()
    //       this.getLogTransaksi()
    //     }).catch(() => this.$commonErrorNotif())
    // },
    toFile (file) {
      window.open(this.$baseURL + 'file-alsintan/' + file, '_blank')
    }
  },
  created () {
    this.getPermohonan()
    this.getLogTransaksi()
  }
}
</script>
