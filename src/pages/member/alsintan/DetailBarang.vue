<template>
  <q-page padding>
    <q-card flat>
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
                <q-carousel-slide name="first" :img-src="data.mm_img != null ? $baseURL+'file-sarpras/'+data.mm_img : 'alsintan/barangsewa/tractorsampel.png'" >
                  <div class="absolute-bottom custom-caption">
                    <div class="text-h2">{{ data.dtlk_nama }}</div>
                    <div class="text-subtitle1">{{ data.child_dtlk_nama }}</div>
                  </div>
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
                    <q-item-label caption>
                      {{ data.kategori_nama }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-h6">{{  data.dtlk_nama }}</q-item-label>
                  </q-item-section>
                </q-item>
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
                      <br />Harga/ Satuan: {{harga}} </p>

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
    <q-card flat>
      <q-card-section class="text-center">
        <span class="text-h6">Catatan Penting:</span>
      </q-card-section>
      <q-separator/>
<!--      <q-card-section v-if="jumlahstok > 1">-->
      <q-card-section>
        <ul>
          <li>Mohon isi form pengajuan dengan benar dan sesuai kebutuhan.</li>
          <li>Pastikan jumlah peminjaman tidak melebihi stok yang tersedia.</li>
          <li>Diwajibkan melampirkan file permohonan pemijaman. <span style="color: blue; cursor: pointer" @click="downloadTemplate()">Download template file disini.</span></li>
          <li>Disarankan melampirkan file berupa scan KTP dan nama kelompok tani</li>
          <li>Melampirkan file surat rekomendasi dinas (Jika Ada)</li>
          <li>Unggah file sesuai pada tempat form yang telah disediakan.</li>
        </ul>
      </q-card-section>
    </q-card>
    <br />
    <q-card flat>
      <q-card-section class="text-center">
        <span class="text-h6">Ajukan Peminjaman</span>
      </q-card-section>
      <q-separator/>
<!--      <q-card-section v-if="jumlahstok < 1">-->
<!--        <q-banner dense inline-actions class="text-white bg-blue-grey">-->
<!--          Stok Barang Sedang Habis. Peminjaman Untuk Sementara Tidak dapat Dilakukan.-->
<!--        </q-banner>-->
<!--      </q-card-section>-->
<!--      <div v-else>-->
      <div>
        <q-form @submit="onSubmit">
          <q-card-section>
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
<!--                  <q-input type="number" v-model="form.permohonan_jumlah_barang" :rules="[val => val !== null || 'Mohon Isi']" :label="'Permohonan Jumlah Barang. Maksimal '+ jumlahstok"/>-->
                  <q-input type="number" v-model="form.permohonan_jumlah_barang" :rules="[val => val !== 0 || 'Mohon Isi']" label="Permohonan Jumlah Barang"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input type="number" v-model="form.permohonan_luas_lahan"  label="Luas Lahan (Ha)"/>
                </q-item-section>
              </q-item>
              <q-item  class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <area-provinsi />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <area-kabupaten />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <area-kecamatan />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <area-desa />
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
                  <br />
                  <q-input type="text" v-model="form.permohonan_nama_poktan" :rules="[val => val !== '' || 'Mohon Isi']" label="Nama Kelompok Tani"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <br />
                  <q-input type="number" v-model="form.permohonan_kontak_penerima" :rules="[val => val !== '' || 'Mohon Isi']" label="Kontak Pemohon (HP/ WA)"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-file color="gray" accept="application/pdf,image/*" :rules="[val => val !== '' || 'Mohon Isi']" v-model="form.permohonan_file_ktp" label="Upload File KTP (PDF/ JPG/PNG)">
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-file color="gray" accept="application/pdf,image/*" :rules="[val => val !== '' || 'Mohon Isi']" v-model="form.permohonan_file_suratpermohonan" label="Upload Surat Permohonan Peminjaman (PDF/ JPG/PNG)">
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-file color="gray" accept="application/pdf,image/*" v-model="form.permohonan_file_rekomendasi" label="Upload Surat Rekomendasi  (PDF/ JPG/PNG| Jika Ada)">
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                </q-item-section>
              </q-item>
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-btn style="background-color: slategray" type="submit" icon="ios_share" class="text-capitalize  text-white"> &nbsp; Ajukan Permohonan Peminjaman</q-btn>
              </q-item-section>
            </q-item>
          </q-card-actions>
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { parseProfile } from '../../../boot/Profile'
const profile = parseProfile()
export default {
  data () {
    return {
      tab: 'detail',
      tabrinci: 'rincian',
      tabhistory: 'now',
      slide: 'first',
      autoplay: true,
      fullscreen: false,
      jumlahstok: atob(this.$route.params.jml),
      form: {
        member_id_pemohon: profile.member.id_member,
        permohonan_desa_id: null,
        permohonan_tgl_pinjam: '2023/01/01',
        permohonan_tgl_kembali: '2023/01/01',
        permohonan_nama_poktan: '',
        permohonan_jumlah_barang: 0,
        permohonan_luas_lahan: 0,
        permohonan_alamat: null,
        permohonan_file_ktp: '',
        permohonan_file_suratpermohonan: '',
        permohonan_file_rekomendasi: '',
        permohonan_kontak_penerima: '',
        permohonan_stok_id: atob(this.$route.params.idstok)
      },
      data: [],
      harga: 0
    }
  },
  methods: {
    getMaterialMasterDetail () {
      this.$showLoading()
      this.$axios.get(`alsintan/material-master/detail/${atob(this.$route.params.id)}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.data = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getHarga () {
      this.$showLoading()
      this.$axios.get(`alsintan/master-harga/getbyidstok/${atob(this.$route.params.idstok)}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.harga = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(res.data.result.harga) + ' / ' + res.data.result.satuan_harga
        }).catch(() => this.$commonErrorNotif())
    },
    downloadTemplate () {
      window.open(this.$baseURL + 'files/template_permohonan_alsintan.docx', '_blank')
    },
    onSubmit () {
      try {
        this.$showLoading()
        this.form.permohonan_desa_id = this.$store.state.area.desa.id
        const formData = new FormData()
        formData.append('FileKTP', this.form.permohonan_file_ktp)
        formData.append('FileSuratPermohonan', this.form.permohonan_file_suratpermohonan)
        formData.append('FileRekomendasi', this.form.permohonan_file_rekomendasi)
        formData.append('data', JSON.stringify(this.form))
        this.$axios.post('alsintan/transaksi/member/pengajuan/', formData, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            // console.log(res)
            if (this.$parseResponse(res.data)) {
              this.$router.push({ name: 'riwayatPeminjaman' })
            }
          })
          .catch(() => this.$commonErrorNotif())
      } catch (e) {
        console.log(e)
      }
    }
  },
  created () {
    this.getMaterialMasterDetail()
    this.getHarga()
  }
}
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
