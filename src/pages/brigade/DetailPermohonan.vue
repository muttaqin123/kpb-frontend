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
                    <q-input type="text" v-model="form.member_detail.nama" :rules="[val => val !== null || 'Mohon Isi']" label="Nama Pemohon"/>
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input type="text" v-model="form.permohonan_kontak_penerima" :rules="[val => val !== null || 'Mohon Isi']" label="Kontak Pemohon"/>
                  </q-item-section>
                </q-item>
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
            <q-card flat bordered >
              <div v-if="form.permohonan_status_pinjam === 1" class="q-pa-md" >
                <div class="text-center">
                  <p><strong>Keputusan Permohonan</strong></p>
                </div>
                <q-list>
                  <q-expansion-item popup icon="add_task" header-class="text-teal" label="Disetujui" caption="Setujui Permohonan">
                    <q-separator />
                    <q-card>
                      <q-card-section>
                        <q-form @submit="submitApprove">
                          <q-item>
                            <q-input style="width: 100%"
                              v-model="formkeputusan.feedback_brigade"
                              label="Keterangan/ Catatan"
                              type="textarea"
                              outlined
                            />
                          </q-item>
                          <q-item>
                           <q-select  :options="OptionSN"  outlined class="full-width" v-model="formkeputusan.sn_id" multiple label="Pilih SN"  option-value="id_sn"  option-label="serial_number"/>
                          </q-item>
                          <q-item>
                            <q-select  :options="OptionAgen"  outlined class="full-width" v-model="formkeputusan.alsin_id_agen"  label="Pilih Agen Distribusi"  option-value="id_member"  option-label="nama_with_kab"/>
                          </q-item>
                          <q-item>
                            <div class="row">
                              <div class="col-lg-12">
                                <p><b>Biaya Sewa: {{harga}}</b></p>
                              </div>
                              <div class="col-lg-9">
                                <q-input style="width: 100%"
                                         v-model="formkeputusan.lama_sewa"
                                         label="Lama Sewa"
                                         outlined
                                />
                              </div>
                              <div class="col-lg-3">
                                <p style="padding-top: 15px">&nbsp; <b>- {{satuanharga}}</b></p>
                              </div>
                            </div>
                          </q-item>
                          <q-item>
                            <div class="row">
                              <div class="col-lg-12">
                                <p><b>Potongan/ Diskon</b></p>
                              </div>
                              <div class="col-lg-1">
                                <p style="padding-top: 15px"><b>Rp.&nbsp;</b></p>
                              </div>
                              <div class="col-lg-10">
                                <q-input style="width: 100%"
                                         v-model="formkeputusan.potongan"
                                         label="Potongan"
                                         outlined
                                />
                              </div>
                            </div>
                          </q-item>
                            <q-item>
                                <q-btn style="background-color: slategray;" type="submit" icon="done_all" class="text-capitalize  text-white"> &nbsp; Simpan</q-btn>
                            </q-item>
                        </q-form>
                        <br />
                        <div style="text-align: justify"><b>Notes:</b> Masukan Serial Number Sesuai Jumlah Permohonan Peminjaman. Masukan lama sewa berdasarkan hasil survey. Setelah Itu, Pihak Brigade/ Penyedia
                        Wajib Mengirimkan Barang yang Dipinjam Ke Alamat yang Tertera Pada Permohonan. Terimakasih.</div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                  <q-expansion-item popup icon="cancel" header-class="text-red" label="Ditolak" caption="Tolak Permohonan">
                    <q-separator />
                    <q-card>
                      <q-card-section>
                        <q-item>
                          <q-input style="width: 100%"
                                   v-model="formkeputusan.feedback_brigade"
                                   label="Keterangan/ Catatan"
                                   type="textarea"
                                   outlined
                          />
                        </q-item>
                        <div style="text-align: center">
                            <q-btn style="background-color: red;" icon="close" @click="submitReject" class="text-capitalize  text-white"> &nbsp; Tolak Permohonan</q-btn>
                        </div>
                        <div style="text-align: justify; padding-top: 10px"><b>Catatan:</b> Pastikan Keputusan Penolakan Telah Benar !</div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>
              </div>
              <div v-if="form.permohonan_status_pinjam === 2" class="q-pa-md" >
                <div class="text-center">
                  <p><strong>Pengeluaran Barang</strong></p>
                  <img src="alsintan/team.png" style="width: 30%" /><br />
                  <q-btn @click="UpdateStatus(form.permohonan_id, form.member_id_pemohon,3)" label="Pengeluaran Barang" outline color="purple" />
                </div>
                <div style="text-align: justify; padding-top: 10px"><b>Catatan:</b>
                  Klik Button Diatas Jika Sudah Pengeluaran Barang Dari Gudang Stok.
                </div>
              </div>
              <div v-if="form.permohonan_status_pinjam === 3" class="q-pa-md" >
                <div class="text-center">
                  <p><strong>Distribusi Ke Agen</strong></p>
                  <img src="alsintan/team.png" style="width: 30%" /><br />
                  <q-item>
                    <q-file color="gray" style="width: 100%" accept="application/pdf,image/*" v-model="formsuratjalan.surat_jalan" label="Unggah Surat Jalan">
                      <template v-slot:prepend>
                        <q-icon name="attach_file" />
                      </template>
                    </q-file>
                  </q-item>
                  <q-btn @click="unggahFileJalan" label="Kirim Ke Agen" outline color="purple" />
                </div>
                <div style="text-align: justify; padding-top: 10px"><b>Catatan:</b>
                  Klik Button Diatas Jika Barang yang Dipinjam Telah Dikirim Ke Agen Untuk Didistribusi.
                </div>
              </div>
              <div v-if="form.permohonan_status_pinjam === 7" class="q-pa-md" >
                <div class="text-center">
                  <p><strong>Konfirmasi Pengembalian</strong></p>
                  <img src="alsintan/team.png" style="width: 30%" /><br />
                  <q-btn @click="UpdateStatus(form.permohonan_id, form.member_id_pemohon,8)" label="Selesai/ Dikembalikan" outline color="purple" />
                </div>
                <div style="text-align: justify; padding-top: 10px"><b>Catatan:</b>
                  Klik Button Diatas Jika Barang yang Dipinjam Telah Dikembalikan.
                </div>
              </div>
              <q-separator />
              <div class="q-px-lg q-pb-md" v-if="form.permohonan_status_pinjam !== 1">
                <div class="text-center">
                  <p><strong>Data Peminjaman</strong></p>
                </div>
                <div style="text-align: justify; padding-top: 10px"><b>Keterangan:</b>
                  {{form.feedback_brigade}} <br />
                  <span v-if="form.permohonan_status_pinjam !== 9" >
                    <b>Lama Sewa:</b> {{form.lama_sewa+' '+satuanharga}}<br />
                    <b>Potongan Biaya:</b> {{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(form.potongan)}}<br />
                  <b>Total Biaya:</b> {{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(form.harga_total)}}
                  <br />
                    <b v-if="form.permohonan_status_pinjam > 3">Surat Jalan:</b> <span @click="toFile(form.surat_jalan)" style="color: teal;cursor:pointer;">Unduh Disini</span><br />
                  <br />
                  <b>Serial Number:</b>
                    <ul>
                      <li v-for="(a, i) in serialnumberapprove" :key="i" >{{a.serial_number}}</li>
                    </ul>
                  </span>
                </div>
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
              <q-separator />
              <div v-if="form.permohonan_status_pinjam > 1 && form.permohonan_status_pinjam < 5" class="q-pa-md" >
                <div class="text-center">
                  <p><strong>OPSI</strong></p>
                  <q-btn @click="dialog = true" label="Ubah Keterangan/ Catatan" outline color="purple" />
                    <div style="padding: 10px">
                       <q-separator />
                    </div>
                  <q-btn @click="UpdateStatus(form.permohonan_id, form.member_id_pemohon,10)" label="Batalkan Peminjaman" outline color="red" />
                </div>
                <div style="text-align: justify; padding-top: 10px"><b>Catatan:</b>
                  Perubahan Tidak Bisa Dilakukan Setelah Barang Dikirim Ke Agen
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="dialog">
      <q-card style="width: 50%;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Form Keterangan</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
          <q-card-section>
            <div class="row">
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input style="width: 100%"
                           v-model="form.feedback_brigade"
                           label="Keterangan/ Catatan"
                           type="textarea"
                           outlined
                  />
                </q-item-section>
              </q-item>
            </div>
          </q-card-section>
          <q-card-section>
            <q-item>
              <q-btn style="background-color: slategray;" @click="updateKeterangan" type="button" icon="done_all" class="text-capitalize  text-white"> &nbsp; Simpan</q-btn>
            </q-item>
          </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { parseProfile } from '../../boot/Profile'
const profile = parseProfile()
const model = () => {
  return {
    member_detail: {
      nama: '',
      kecamatan: '',
      kabupaten: ''
    },
    permohonan_tgl_pinjam: '2023/01/01',
    permohonan_tgl_kembali: '2023/01/01',
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
    member_id_pemohon: ''
  }
}
export default {
  data () {
    return {
      form: model(),
      dialog: false,
      data: [],
      tab: 'detail',
      tabrinci: 'rincian',
      tabhistory: 'now',
      slide: 'first',
      autoplay: true,
      fullscreen: false,
      log: [],
      harga: 0,
      satuanharga: '',
      serialnumberapprove: [],
      formkeputusan: {
        permohonan_id: '',
        sn_id: null,
        pegawai_alsin_id: profile.member.id_member,
        id_pemohon: '',
        feedback_brigade: null,
        alsin_id_agen: null,
        lama_sewa: 0,
        harga: 0,
        potongan: 0
      },
      formsuratjalan: {
        surat_jalan: ''
      },
      OptionSN: [{
        id_sn: '',
        stok_id: '',
        serial_number: ''
      }],
      OptionAgen: [{
        id_member: null,
        nama: null
      }]
    }
  },
  methods: {
    resetForm () {
      this.form = model()
    },
    // openDialog (mode, data) {
    //   this.dialog = true
    // },
    getPermohonan () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/brigade/detail-pengajuan/${atob(this.$route.params.id)}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.form = res.data.result
          this.data = res.data.result.barang_detail
          this.formkeputusan.permohonan_id = res.data.result.permohonan_id
          this.formkeputusan.id_pemohon = res.data.result.member_id_pemohon
          this.getLogTransaksi(res.data.result.member_id_pemohon)
          this.getOptionsSN(res.data.result.permohonan_stok_id)
          this.getOptionsAgen()
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
          this.satuanharga = res.data.result.satuan_harga
          this.formkeputusan.harga = res.data.result.harga
        }).catch(() => this.$commonErrorNotif())
    },
    getDataSNPersetujuan () {
      this.$axios.get(`alsintan/transaksi/brigade/get-datasnpersetujuan/${atob(this.$route.params.id)}`, this.$createToken())
        .then(res => {
          // console.log(res.data.result.length)
          if (res.data.result.length > 0) {
            this.serialnumberapprove = res.data.result[0].data_sn
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getLogTransaksi (idpemohon) {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/member/log/${idpemohon}/${atob(this.$route.params.id)}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          this.log = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getOptionsSN (idstok) {
      this.$axios.get(`alsintan/transaksi/brigade/get-stoksn/${idstok}`, this.$createToken())
        .then(res => {
          this.OptionSN = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    async getOptionsAgen () {
      await this.$axios.get('alsintan/agen', this.$createToken())
        .then(res => {
          // this.OptionAgen = res.data.result
          // this.OptionAgen.map(obj => ({
          //   ...obj, // Menggunakan spread operator (...) untuk menyalin objek yang ada
          //   nama_with_kab: `${obj.nama} ${obj.kabupaten}` // Menambahkan key "pekerjaan" dengan nilai "Pekerja"
          // }))
          // this.OptionAgen = arrayBaru
          // console.log(this.OptionAgen)
          const data = res.data.result
          const dataBaru = data.map(obj => ({
            ...obj,
            nama_with_kab: `${obj.nama} ${obj.kabupaten}`
          }))
          console.log(dataBaru)
          this.OptionAgen = dataBaru
        }).catch(() => this.$commonErrorNotif())
    },
    submitApprove () {
      // console.log(this.formkeputusan)
      try {
        this.$showLoading()
        this.$axios.post('alsintan/transaksi/brigade/setujui-permohonan/', this.formkeputusan, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            // console.log(res)
            if (this.$parseResponse(res.data)) {
              this.getPermohonan()
              this.getDataSNPersetujuan()
            }
          })
          .catch(() => this.$commonErrorNotif())
      } catch (e) {
        console.log(e)
      }
    },
    submitReject () {
      try {
        this.$showLoading()
        this.$axios.post('alsintan/transaksi/brigade/tolak-permohonan/', this.formkeputusan, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            // console.log(res)
            if (this.$parseResponse(res.data)) {
              this.getPermohonan()
            }
          })
          .catch(() => this.$commonErrorNotif())
      } catch (e) {
        console.log(e)
      }
    },
    updateKeterangan () {
      try {
        this.$showLoading()
        this.$axios.post('alsintan/transaksi/brigade/update-keterangan-permohonan/', {
          feedback_brigade: this.form.feedback_brigade,
          permohonan_id: atob(this.$route.params.id)
        }, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            // console.log(res)
            if (this.$parseResponse(res.data)) {
              this.dialog = false
              this.getPermohonan()
            }
          })
          .catch(() => this.$commonErrorNotif())
      } catch (e) {
        console.log(e)
      }
    },
    unggahFileJalan () {
      try {
        this.$showLoading()
        const formData = new FormData()
        formData.append('filesurat', this.formsuratjalan.surat_jalan)
        formData.append('data', JSON.stringify(this.formsuratjalan))
        this.$axios.put(`alsintan/transaksi/brigade/uploadsuratjalan/${atob(this.$route.params.id)}`, formData, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            // console.log(res)
            if (res.data.code === 200) {
              this.UpdateStatus(this.form.permohonan_id, this.form.member_id_pemohon, 4)
            }
          })
          .catch(() => this.$commonErrorNotif())
      } catch (e) {
        console.log(e)
      }
    },
    toFile (file) {
      window.open(this.$baseURL + 'file-alsintan/' + file, '_blank')
    },
    // KonfirmasiSelesai (idtr, idpemohon) {
    //   this.$showLoading()
    //   this.$axios.get(`alsintan/transaksi/brigade/update-statuspeminjaman/${idpemohon}/${idtr}/8`, this.$createToken())
    //     .finally(() => this.$hide())
    //     .then(res => {
    //       if (this.$parseResponse(res.data)) {
    //         this.getPermohonan()
    //         this.getLogTransaksi(idpemohon)
    //       }
    //     }).catch(() => this.$commonErrorNotif())
    // },
    UpdateStatus (idtr, idpemohon, status) {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/brigade/update-statuspeminjaman/${idpemohon}/${idtr}/${status}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.getPermohonan()
            this.getLogTransaksi(idpemohon)
          }
        }).catch(() => this.$commonErrorNotif())
    }
  },
  created () {
    this.getPermohonan()
    this.getDataSNPersetujuan()
  }
}
</script>
