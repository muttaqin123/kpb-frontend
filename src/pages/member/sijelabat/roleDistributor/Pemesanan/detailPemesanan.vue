<template>
  <q-page padding>
    <q-banner inline-actions rounded style="background-color: #050D33; color: #FFFFFF">
      <strong>Detail Pemesanan</strong>
    </q-banner>
    <br />
    <q-card flat>
      <q-card-section>
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <div>ID TRANSAKSI</div>
            <div class="text-h5 q-mt-sm q-mb-xs">{{ datapemesanan.nomor_transaksi }}</div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <div>STATUS</div>
            <div class="text-h5 q-mt-sm q-mb-xs"><q-badge outline color="primary" :label="datapemesanan.order_status_sijelabat?.nama_status" /><br />
              <q-btn outline color="red" v-if="datapemesanan.kode_order_status === 3" @click="progressBayar(false)"> Lakukan Pembayaran</q-btn>
              <q-btn outline color="red" size="sm" v-if="datapemesanan.kode_order_status === 7" @click="nextStatus(8)"> Konfirmasi Sampai & Selesai</q-btn>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <div>TANGGAL</div>
            <div class="text-h5 q-mt-sm q-mb-xs">{{$parseDate(datapemesanan.created_at).fullDate}}</div>
          </div>
        </div>
      </q-card-section>
    </q-card><br />
    <div class="row">
      <div style="padding-right: 10px" class="col-lg-8 col-md-8 col-sm-12 col-xs-12" >
        <q-card flat>
          <q-card-section>
            <q-item-label>Produk: </q-item-label>
          </q-card-section>
          <!--          <q-separator />-->
          <q-card-section>
            <table>
              <tbody>
              <tr v-for="barang in datapemesanan.order_mm_jelabat" :key="barang.mm_id">
                <td><b>{{barang.material_master.mm_nama}}</b> <br /> {{$convertRupiah(barang.harga_riwayat_jelabat.harga) +' x '+ barang.quantity}}</td>
                <td>{{$convertRupiah(calculateSubtotal(barang.harga_riwayat_jelabat.harga, barang.quantity))}}</td>
              </tr>
              <tr style="background-color: #D9D9D9">
                <td><b>Total</b></td>
                <td><b>{{$convertRupiah(calculateTotal())}}</b></td>
              </tr>
              </tbody>
            </table>
          </q-card-section>
        </q-card><br />
        <q-card flat>
          <q-card-section>
            <div class="q-px-lg q-pb-md">
              <q-timeline color="secondary">
                <div class="text-center">
                  <H5>Log Status Pemesanan</H5>
                </div>
                <q-timeline-entry v-for="(a, i) in datapemesanan.order_status_riwayat_sijelabat" :key="i" :title="a.order_status_sijelabat.nama_status"
                                  :subtitle="$parseDate(a.created_at).fullDate">
                  <div>
                    {{a.order_status_sijelabat.deskripsi}}
                  </div>
                </q-timeline-entry>
              </q-timeline>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" >
        <q-card flat>
          <q-card-section>
            <q-item-label>Catatan/ Keterangan Pembeli: </q-item-label>
          </q-card-section>
          <q-card-section>
            <span><b>{{ datapemesanan.notes ?? '-' }}</b></span>
          </q-card-section>
        </q-card><br />
        <q-card flat>
          <q-card-section>
            <q-item-label>Feedback/ Keterangan Dari Penyedia/ Penjual: </q-item-label>
          </q-card-section>
          <q-card-section>
            <span><b>{{ datapemesanan.feedback_penjual ?? '-' }}</b></span>
          </q-card-section>
        </q-card><br />
        <q-card flat>
          <q-card-section>
            <q-item-label>Alamat Pengiriman: </q-item-label>
          </q-card-section>
          <q-card-section>
            <span><b>{{dataprofilUsaha.nama_usaha}}</b></span><br />
            <span>{{dataprofilUsaha.kontak}}</span><br />
            <span>
                   {{ dataprofilUsaha?.alamat_usaha?.toUpperCase() }}
                    KELURAHAN/ DESA {{ dataprofilUsaha?.reg_villages?.name?.toUpperCase() }}
                    KECAMATAN {{ dataprofilUsaha?.reg_districts?.name?.toUpperCase() }}
                    {{ dataprofilUsaha?.reg_regencies?.name?.toUpperCase() }}
                    PROVINSI {{ dataprofilUsaha?.reg_provinces?.name?.toUpperCase() }}
                </span>
          </q-card-section>
          <q-card-section>
            <!--                <q-btn outline color="primary" > Cetak Nota Transaksi</q-btn>-->
          </q-card-section>
        </q-card><br />
        <q-card flat v-if="datapemesanan.kode_order_status > 4 && datapemesanan.kode_order_status < 9 ">
          <q-card-section>
            <q-list bordered class="rounded-borders">
              <q-expansion-item
                switch-toggle-side
                expand-separator
                label="Lihat Bukti Pembayaran"
              >
                <div class="row">
                  <div class="col-lg-12" style="padding-top: 10px">
                    <q-img :src="`${$baseURL + 'file-sijelabat-buktibayar/' + datapemesanan.bukti_bayar}`" />
                  </div>
                  <div style="padding-top: 20px" class="col-12">
                    <table>
                      <tbody>
                      <tr>
                        <td>Nominal Bayar</td>
                        <td>{{$convertRupiah(datapemesanan.nominal_bayar)}}</td>
                      </tr>
                      <tr>
                        <td>Metode Pembayaran</td>
                        <td>{{datapemesanan.metode_pembayaran}}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </q-expansion-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="dialogBayar">
      <q-card style="width: 600px; max-width: 95%">
        <q-tabs
          v-model="activeTab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="metode-bayar" label="Metode Bayar" />
          <q-tab name="cara-bayar" label="Cara Pembayaran" />
        </q-tabs>
        <q-separator />

        <q-tab-panels v-model="activeTab" animated>
          <q-tab-panel name="metode-bayar">
            <div class="row">
              <div class="col-12">
                <q-item>
                  <q-file class="full-width" accept=".jpg, image/*" color="grey-3" outlined label-color="blue" v-model="form.bukti_bayar" label="Bukti Bayar">
                    <template v-slot:append>
                      <q-icon name="attachment" color="blue" />
                    </template>
                  </q-file>
                </q-item>
              </div>

              <div class="col-12">
                <q-item>
                  <q-input type="number" outlined class="full-width" v-model="form.nominal_bayar" label="Masukan Nominal"/>
                </q-item>
              </div>

              <q-item class="col-12">
                <q-select outlined class="full-width" v-model="form.metode_pembayaran" :options="optionsMetodeBayar" label="Metode Pembayaran"/>
              </q-item>
            </div>
          </q-tab-panel>

          <q-tab-panel name="cara-bayar">
            <q-list bordered class="rounded-borders">
              <q-expansion-item
                switch-toggle-side
                expand-separator
                label="Setor Tunai"
              >
                <q-card>
                  <q-card-section>
                    <ul type="number">
                      <li>Datang langsung ke Tempat Usaha:
                        <ul>
                          <li>Kunjungi tempat usaha penyedia barang atau layanan.</li>
                          <li>Pastikan membawa jumlah uang yang sesuai dengan nominal yang harus dibayar.</li>
                          <li>Tanyakan kepada petugas atau kasir tempat usaha untuk prosedur setor tunai.</li>
                        </ul>
                      </li>
                      <li>
                        Konfirmasi Pembayaran:
                        <ul>
                          <li>Setelah setor tunai, pastikan untuk mendapatkan bukti pembayaran atau struk dari tempat usaha.</li>
                          <li>Simpan bukti pembayaran ini sebagai referensi untuk transaksi Anda.</li>
                          <li><b style="color: darkred">Upload Bukti Pembayaran disini agar ter-record oleh aplikasi</b></li>
                        </ul>
                      </li>
                    </ul>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-separator />
              <q-expansion-item
                switch-toggle-side
                expand-separator
                label="Transfer Bank"
              >
                <q-card>
                  <q-card-section>
                    <ul>
                      <li>
                        <strong>Pilih Metode Pembayaran:</strong>
                        <p>Pada saat checkout atau konfirmasi pesanan, pilih opsi "Transfer Bank" sebagai metode pembayaran.</p>
                      </li>
                      <li>
                        <strong>Informasi Rekening:</strong>
                        <p style="color:teal;"><strong>
                          Nama Bank: {{datapemesanan.profil_usaha.rekening_bank_usaha[0].master_bank.nama_bank}} a.n {{datapemesanan.profil_usaha.rekening_bank_usaha[0].atas_nama}} <br />
                          No. Rekening: {{datapemesanan.profil_usaha.rekening_bank_usaha[0].nomor_rekening}}
                        </strong>
                        </p>
                      </li>
                      <li>
                        <strong>Lakukan Transfer:</strong>
                        <p>
                          Gunakan fasilitas perbankan Anda untuk melakukan transfer sesuai dengan nominal yang tertera pada tagihan atau pesanan.
                          Pastikan untuk mengonfirmasi nomor rekening dan informasi pembayaran sebelum melakukan transfer.
                        </p>
                      </li>
                      <li>
                        <strong>Simpan dan Upload Bukti Transfer:</strong>
                        <p>
                          Setelah transfer selesai, simpan bukti transfer atau struk yang menunjukkan bahwa pembayaran telah berhasil dilakukan.
                          <b style="color: darkred">Upload Bukti Pembayaran disini agar ter-record oleh aplikasi</b>
                        </p>
                      </li>
                    </ul>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
            <br />
            <span>
              <b>Catatan Penting:</b>
              <ul type="number">
                <li>
                 Harap pastikan untuk melakukan pembayaran sesuai dengan instruksi dan tagihan yang tertera.
                </li>
                <li>Jika ada kendala atau pertanyaan terkait pembayaran, hubungi customer service tempat usaha untuk bantuan lebih lanjut.</li>
              </ul>
            </span>
          </q-tab-panel>
        </q-tab-panels>
        <q-card-actions align="right">
          <q-btn label="Batal" color="negative" v-close-popup />
          <q-btn label="Simpan" color="primary" @click="progressBayar(true)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { parseProfile } from '../../../../../boot/Profile'
const profile = parseProfile()
export default {
  name: 'listKatalogLayout',
  data () {
    return {
      datapemesanan: [],
      dataprofilUsaha: [],
      activeTab: 'metode-bayar',
      dialogBayar: false,
      form: {
        metode_pembayaran: null,
        bukti_bayar: null,
        nominal_bayar: null
      },
      optionsMetodeBayar: ['Tunai', 'Transfer Bank', 'Lainnya']
    }
  },
  methods: {
    getProfilUsaha () {
      this.$axios.get(`sijelabat/profil-usaha/show/byidmember/${btoa(profile.member.id_member)}/${btoa(this.$route.params.idLayanan)}`, this.$createToken())
        .then(res => {
          this.dataprofilUsaha = res.data.result[0]
        }).catch(() => this.$commonErrorNotif())
    },
    getDetailRiwayat () {
      this.$showLoading()
      this.$axios.get(`sijelabat/distributor/riwayat-pemesanan/detail/${this.$route.params.id}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          if (this.$parseResponse(res.data, false)) {
            this.datapemesanan = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    calculateSubtotal (harga, quantity) {
      return harga * quantity
    },
    calculateTotal () {
      if (this.datapemesanan && this.datapemesanan.order_mm_jelabat) {
        return this.datapemesanan.order_mm_jelabat.reduce((total, barang) => {
          return total + this.calculateSubtotal(barang.harga_riwayat_jelabat.harga, barang.quantity)
        }, 0)
      } else {
        return 0 // atau nilai default lainnya
      }
    },
    progressBayar (status) {
      if (status) {
        const emptyFields = ['nominal_bayar', 'bukti_bayar', 'metode_pembayaran']
          .filter(field => !this.form[field])

        if (emptyFields.length > 0) {
          const errorMessage = `Mohon isi form berikut: ${emptyFields.join(', ')}`
          this.$notif(errorMessage, 'negative')
        } else {
          const formData = new FormData()
          formData.append('Foto', this.form.bukti_bayar)
          formData.append('data', JSON.stringify(this.form))
          this.$showLoading()
          this.$axios.put(`sijelabat/distributor/riwayat-pemesanan/unggah-bayar/${this.$route.params.id}`, formData, this.$createToken())
            .finally(() => this.$hide())
            .then(res => {
              if (this.$parseResponse(res.data, true)) {
                this.getDetailRiwayat()
                this.dialogBayar = false
              }
            }).catch(() => this.$commonErrorNotif())
        }
      } else {
        this.dialogBayar = true
      }
    },
    nextStatus (status) {
      this.$showLoading()
      this.$axios.put(`sijelabat/universal/detail-transaksi/next-status/${this.$route.params.id}`,
        {
          kode_order_status: status
        }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, true)) {
            this.getDetailRiwayat()
          }
        }).catch(() => this.$commonErrorNotif())
    }
  },
  created () {
    this.getDetailRiwayat()
    this.getProfilUsaha()
  }
}
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #ffffff;
}
</style>
